import React, { useState, useRef } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    PanResponder,
    GestureResponderEvent,
    PanResponderGestureState,
    TouchableOpacity,
    Text,
} from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { Asset } from 'expo-asset';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import BackButton from '@/components/BackButton';

export default function RenderProperty() {
    const [isLoading, setIsLoading] = useState(true);

    const modelRef = useRef<THREE.Object3D | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    const zoomRef = useRef(1.5);
    const baseDistanceRef = useRef(1);

    const SENSITIVITY = 0.0002;
    const ZOOM_MIN = 0.5;
    const ZOOM_MAX = 5;
    const ROTATION_X_MIN = -1.2;
    const ROTATION_X_MAX = 0.5;

    // Rotación con gesto táctil, 
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
                const model = modelRef.current;
                if (model) {
                    model.rotation.y += gesture.dx * SENSITIVITY;

                    const nextX = model.rotation.x + gesture.dy * SENSITIVITY;
                    model.rotation.x = Math.max(ROTATION_X_MIN, Math.min(ROTATION_X_MAX, nextX));
                }
            },
        })
    ).current;

    // Actualizar zoom de cámara
    const updateCameraZoom = () => {
        if (cameraRef.current) {
            cameraRef.current.position.z = baseDistanceRef.current * zoomRef.current;
        }
    };

    const handleZoomIn = () => {
        zoomRef.current = Math.max(ZOOM_MIN, zoomRef.current - 0.1);
        updateCameraZoom();
    };

    const handleZoomOut = () => {
        zoomRef.current = Math.min(ZOOM_MAX, zoomRef.current + 0.1);
        updateCameraZoom();
    };

    // Inicializ el contexto 3D, la camara y la escena y todo
    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            gl.drawingBufferWidth / gl.drawingBufferHeight,
            0.1,
            1000
        );
        cameraRef.current = camera;

        const renderer = new Renderer({ gl });
        renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

        // Luces de la escena
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 5, 5);
        scene.add(directionalLight);

        try {
            const asset = Asset.fromModule(require('../../assets/models/casa4.glb'));
            await asset.downloadAsync();

            const loader = new GLTFLoader();
            loader.load(
                asset.localUri || '',
                (gltf) => {
                    const model = gltf.scene;
                    const pivot = new THREE.Group();
                    pivot.add(model);
                    scene.add(pivot);
                    modelRef.current = pivot;

                    // Centrar modelo
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                    model.rotation.y = Math.PI / 6;
                    model.rotation.x = Math.PI / 18;

                    // Configurar cámara
                    const size = box.getSize(new THREE.Vector3());
                    const baseDistance = Math.max(size.x, size.y, size.z);
                    baseDistanceRef.current = baseDistance;

                    camera.position.set(0, 0, baseDistance * zoomRef.current);
                    camera.lookAt(0, 0, 0);

                    // Animación
                    const animate = () => {
                        requestAnimationFrame(animate);
                        renderer.render(scene, camera);
                        gl.endFrameEXP();
                    };

                    animate();
                    setIsLoading(false);
                },
                undefined,
                (error) => {
                    console.error('Error cargando GLB:', error);
                    setIsLoading(false);
                }
            );
        } catch (err) {
            console.error('Error cargando asset:', err);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container} {...panResponder.panHandlers}>
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#6200ee" />
                </View>
            )}

            <BackButton />

            {/* Vista 3D */}
            <GLView style={styles.glView} onContextCreate={onContextCreate} />

            {/* Controles de zoom */}
            <View style={styles.zoomControls}>
                <TouchableOpacity onPress={handleZoomIn} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>＋</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoomOut} style={styles.zoomButton}>
                    <Text style={styles.zoomText}>－</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    glView: {
        flex: 1,
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        zIndex: 10,
    },
    zoomControls: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        gap: 10,
    },
    zoomButton: {
        backgroundColor: '#ffffffcc',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    zoomText: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
});
