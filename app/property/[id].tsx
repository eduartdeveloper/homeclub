import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Image, StyleSheet, ScrollView, Linking, Platform } from 'react-native';
import { Text, Card, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function PropertyDetail() {
    const { id } = useLocalSearchParams();
    const { colors } = useTheme();
    const router = useRouter()

    const openGoogleMapsRoute = () => {
        const destinationLat = 6.2442;   // reemplaza con latitud de la propiedad
        const destinationLng = -75.5812; // reemplaza con longitud de la propiedad

        const url = Platform.select({
            ios: `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}`,
            android: `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}`
        });

        Linking.openURL(url);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
                {/* 📸 Banner */}
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' }}
                    style={styles.banner}
                />

                {/* 🏠 Info */}
                <View style={styles.infoContainer}>
                    <Text variant="titleLarge" style={{ marginBottom: 8 }}>
                        Apartamento en Medellín
                    </Text>

                    <View style={styles.infoRow}>
                        <Ionicons name="bed-outline" size={20} color={colors.primary} />
                        <Text style={styles.infoText}>3 Habitaciones</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="water-outline" size={20} color={colors.primary} />
                        <Text style={styles.infoText}>2 Baños</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="car-outline" size={20} color={colors.primary} />
                        <Text style={styles.infoText}>1 Parqueadero</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color={colors.primary} />
                        <Text style={styles.infoText}>El Poblado, Medellín</Text>
                    </View>
                </View>

                {/* 📝 Descripción */}
                <Card style={styles.card}>
                    <Card.Title title="Descripción" />
                    <Card.Content>
                        <Text>
                            Este hermoso apartamento está ubicado en una zona exclusiva con excelente iluminación y una vista espectacular. Ideal para quienes buscan comodidad y diseño moderno.
                        </Text>
                    </Card.Content>
                </Card>

                {/* 🗺️ Mapa */}
                <Card style={styles.card}>
                    <Card.Title title="Ubicación" />
                    <Card.Content>
                        <MapView
                            style={styles.realMap}
                            initialRegion={{
                                latitude: 6.2442, // Medellín
                                longitude: -75.5812,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            provider="google" // ✅ Esto asegura que uses Google Maps
                        >
                            <Marker
                                coordinate={{ latitude: 6.2442, longitude: -75.5812 }}
                                title="Apartamento"
                                description="El Poblado, Medellín"
                            />
                        </MapView>
                        <Button mode="outlined" onPress={openGoogleMapsRoute}>
                            Ver ruta en Google Maps
                        </Button>
                    </Card.Content>
                </Card>

                {/* 🧊 Render 3D */}
                <Card style={styles.card}>
                    <Card.Title title="¿Quieres ver la propiedad en 3D?" />
                    <Card.Content>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be' }}
                            style={styles.renderImage}
                        />
                        <Text style={{ marginTop: 12 }}>
                            Explora la propiedad con una experiencia inmersiva en 3D y recorre cada rincón desde tu dispositivo.
                        </Text>
                        <Button
                            mode="contained"
                            icon="cube-outline"
                            style={{ marginTop: 12 }}
                            onPress={() => router.push('/property/render') }
                        >
                            Ver render 3D
                        </Button>
                    </Card.Content>
                </Card>
            </ScrollView>

            {/* 🧭 Botones fijos */}
            <View style={styles.fixedButtons}>
                <Button mode="outlined" onPress={() => console.log('Reservar')} style={styles.bottomButton}>
                    Reservar
                </Button>
                <Button mode="outlined" onPress={() => console.log('Escribir')} style={styles.bottomButton}>
                    Escríbenos
                </Button>
                <Button mode="contained" onPress={() => console.log('Agendar')} style={styles.bottomButton}>
                    Agenda una visita
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 220,
    },
    infoContainer: {
        padding: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
    },
    card: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    mapImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    renderImage: {
        width: '100%',
        height: 160,
        borderRadius: 10,
        marginBottom: 10,
    },
    fixedButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    bottomButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    realMap: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    }
});
