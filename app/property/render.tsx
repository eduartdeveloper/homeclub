import React, { useState, useRef, useEffect } from 'react';
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

    // PanResponder para rotar el modelo con el dedo
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
                const model = modelRef.current;
                if (model) {
                    const sensitivity = 0.0002;
                    model.rotation.y += gestureState.dx * sensitivity;

                    let nextX = model.rotation.x + gestureState.dy * sensitivity;
                    model.rotation.x = Math.max(-1.2, Math.min(0.5, nextX));
                }
            },
        })
    ).current;

    // Actualiza la posición de la cámara al hacer zoom
    const updateCameraZoom = () => {
        if (cameraRef.current) {
            cameraRef.current.position.z = baseDistanceRef.current * zoomRef.current;
        }
    };

    const handleZoomIn = () => {
        zoomRef.current = Math.max(0.5, zoomRef.current - 0.1);
        updateCameraZoom();
    };

    const handleZoomOut = () => {
        zoomRef.current = Math.min(5, zoomRef.current + 0.1);
        updateCameraZoom();
    };

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

        // Luces
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
                    modelRef.current = model;
                    // Crear un grupo contenedor
                    const pivot = new THREE.Group();
                    pivot.add(model);
                    scene.add(pivot);
                    modelRef.current = pivot;

                    // Centrar el modelo dentro del grupo
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);
                    model.rotation.y = Math.PI / 6;
                    model.rotation.x = Math.PI / 18; // 10°




                    // Calcular distancia base y configurar cámara
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
                    console.error('Error loading GLB:', error);
                    setIsLoading(false);
                }
            );
        } catch (err) {
            console.error('Error loading asset:', err);
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

// Estilos
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
