import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import BackButton from '@/components/BackButton';

export default function PropertyDetail() {
    const { id } = useLocalSearchParams();
    const { colors } = useTheme();
    const router = useRouter();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://run.mocky.io/v3/5fb17bbe-dcc5-4a75-ad0b-fe165714cc64')
            .then(res => res.json())
            .then(data => {
                const selected = data.find(item => item.id === id);
                setProperty(selected);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading property:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading || !property) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Cargando propiedad...</Text>
            </View>
        );
    }

    const openGoogleMapsRoute = () => {
        const destinationLat = property.latitud;
        const destinationLng = property.longitud;

        const url = Platform.select({
            ios: `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}`,
            android: `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`
        });

        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackButton />
            <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
                {/* 📸 Banner */}
                <View style={styles.bannerContainer}>
                    <Image source={{ uri: property.image }} style={styles.banner} resizeMode='cover' />
                </View>

                {/* 🏠 Info */}
                <View style={styles.infoContainer}>
                    <Text variant="titleLarge" style={styles.title}>
                        {property.title}
                    </Text>

                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="bed-outline" size={15} color="black" style={styles.detailIcon} />
                        <Text style={styles.infoText}>{property.bedrooms} Habitaciones</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="shower" size={15} color="black" style={styles.detailIcon} />
                        <Text style={styles.infoText}>{property.bathrooms} Baños</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="ruler" size={15} color="black" style={styles.detailIcon} />
                        <Text style={styles.infoText}>{property.size}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker" size={15} color="black" style={styles.detailIcon} />
                        <Text style={styles.infoText}>{property.location}</Text>
                    </View>

                    <Text style={styles.titleDescription}>Descripción</Text>
                    <Text>{property.descripcion}</Text>
                </View>


                {/* 🗺️ Mapa */}
                <Card style={styles.card}>
                    <Card.Title title="Descubre tu nuevo hogar" titleStyle={{ fontSize: 20, fontWeight: 'bold', color: '#333' }} />
                    <Card.Content>
                        <MapView
                            style={styles.realMap}
                            initialRegion={{
                                latitude: property.latitud,
                                longitude: property.longitud,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            provider="google"
                        >
                            <Marker
                                coordinate={{ latitude: property.latitud, longitude: property.longitud }}
                                title={property.title}
                                description={property.location}
                            />
                        </MapView>
                        <Text style={{ paddingVertical: 15 }}>Planifica el camino hacia tu nuevo hogar con solo un clic</Text>
                        <Button mode="contained" onPress={openGoogleMapsRoute} style={styles.button}>
                            Calcular ruta en Google Maps
                        </Button>
                    </Card.Content>
                </Card>

                {/* 🧊 Render 3D (opcional o estático) */}
                <Card style={styles.card}>

                    <Card.Content>
                        <Text style={styles.renderTitle}>Visualiza tu futuro hogar en 3D</Text>
                        <Image
                            source={require('../../assets/images/render.png')}
                            style={styles.renderImage}
                            resizeMode='contain'
                        />
                        <Text style={styles.renderText}>
                            Vive la experiencia virtual como si ya estuvieras allí.
                        </Text>
                        <Button mode="contained" onPress={() => router.push('/property/render')} style={[styles.button, { width: '50%' }]}>
                            Ver render 3D
                        </Button>
                    </Card.Content>
                </Card>

                

            </ScrollView>
            <View style={styles.fixedBottomContainer}>
                    <Button
                        mode="contained"
                        onPress={() => alert('Reserva realizada')}
                        style={[styles.fixedButton, styles.button]}
                        labelStyle={{ color: '#fff' }}
                    >
                        Reservar
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => router.push('/booking/chat')}
                        style={[styles.fixedButton, styles.button]}
                        labelStyle={{ color: '#fff' }}
                    >
                        Escríbenos
                    </Button>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bannerContainer: {
        backgroundColor: 'white'
    },
    banner: {
        width: '100%',
        aspectRatio: 1,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },
    button: {
        marginTop: 12,
        borderRadius: 10,
        backgroundColor: '#000'
    },
    title: {
        marginBottom: 8,
        textAlign: 'center',
        color: '#000',
        fontSize: 23,
        fontWeight: '800',
    },
    infoContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    infoText: {
        marginLeft: 8,
    },
    card: {
        margin: 12,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    realMap: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    renderTitle: {
        fontSize: 20,
        fontWeight: 800
    },
    renderText: {
        width: '60%',
        paddingVertical: 20
    },
    renderImage: {
        width: '50%',
        height: 150,
        position: 'absolute',
        top: 30,
        right: 0
    },
    cartTitle: {
        fontWeight: 800,
        fontSize: 20
    },
    titleDescription: {
        fontSize: 20,
        fontWeight: 800,
        marginTop: 25
    },
    fixedBottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 30 : 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        zIndex: 999, 
        elevation: 20, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    fixedButton: {
        flex: 1,
        marginHorizontal: 6,
        borderRadius: 10,
    }
    
});
