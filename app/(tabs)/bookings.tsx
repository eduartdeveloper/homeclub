import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

export default function ReservationsScreen() {
    const router = useRouter()
    const [reservations, setReservations] = useState([]);

    const formatCOP = (value) => {
        return new Intl.NumberFormat('es-CO').format(value);
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("https://run.mocky.io/v3/a75e7a9a-23b6-41e6-b80b-93fc3b501d90");
                const data = await response.json();
                setReservations(data);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>
                Mis reservas
            </Text>
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => router.push(`/booking/${item.id}/detail`) }>
                        <View style={styles.cardContent}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text variant="titleMedium">{item.title}</Text>
                                <Text variant="bodySmall" style={styles.location}>
                                    {item.location}
                                </Text>
                                <Text variant="bodyMedium" style={styles.price}>
                                    ${formatCOP(item.price)}
                                </Text>
                                <Text variant="bodySmall" style={styles.duration}>
                                    {item.duration} dias
                                </Text>
                                <Text variant="bodySmall" style={styles.duration}>
                                    Estado: {item.status}
                                </Text>
                            </View>
                            <IconButton icon="arrow-right" size={24} />
                        </View>
                    </Card>
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop:50,
        backgroundColor: "#F8F9FA",
    },
    header: {
        marginBottom: 16,
        fontWeight: "bold",
    },
    card: {
        marginBottom: 12,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#FFF",
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    location: {
        color: "gray",
    },
    price: {
        fontWeight: "bold",
        marginTop: 4,
    },
    duration: {
        color: "gray",
    },
});

