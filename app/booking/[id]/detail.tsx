import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackButton from "@/components/BackButton";

interface Reservation {
    id: string;
    title: string;
    location: string;
    image: string;
    price: string;
    duration: string;
    status: string;
}

export default function ReservationDetail(): JSX.Element {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await fetch(
                    "https://run.mocky.io/v3/a75e7a9a-23b6-41e6-b80b-93fc3b501d90"
                );
                const data: Reservation[] = await response.json();
                const selected = data.find((item) => item.id === id);
                setReservation(selected || null);
            } catch (error) {
                console.error("Error al obtener la reserva:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchReservation();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Cargando reserva...</Text>
            </View>
        );
    }
    if (!reservation) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No se encontró la reserva</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton />

                <Card style={styles.card}>
                    <Image source={{ uri: reservation.image }} style={styles.image} />
                    <Card.Content>
                        <Text variant="headlineMedium" style={styles.title}>
                            {reservation.title}
                        </Text>

                        <InfoRow icon="map-marker" text={reservation.location} />
                        <InfoRow icon="cash" text={`$${reservation.price}`} />
                        <InfoRow icon="watch" text={`${reservation.duration} días`} />
                        <InfoRow icon="check" text={`Estado: ${reservation.status}`} />
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
}

function InfoRow({ icon, text }: { icon: string; text: string }) {
    return (
        <View style={styles.infoRow}>
            <MaterialCommunityIcons name={icon} size={18} color="black" />
            <Text style={styles.infoText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        padding: 0,
    },
    card: {
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
        backgroundColor: "white",
    },
    image: {
        width: "100%",
        height: 220,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    title: {
        marginTop: 12,
        fontWeight: "800",
        color: "black",
        fontSize: 20,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 16,
        color: "#000",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
});
