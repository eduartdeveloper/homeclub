import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";
import { Card, Text, IconButton } from "react-native-paper";

const reservations = [
    {
        id: "1",
        title: "Hotel in Miami",
        location: "Miami Beach, FL",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        price: "$250/night",
        duration: "3 nights",
    },
    {
        id: "2",
        title: "Resort in Cancun",
        location: "Cancun, Mexico",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        price: "$300/night",
        duration: "5 nights",
    },
    {
        id: "3",
        title: "Cabin in Aspen",
        location: "Aspen, CO",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        price: "$180/night",
        duration: "2 nights",
    },
];

export default function ReservationsScreen() {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.header}>
                Mis reservas
            </Text>
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.cardContent}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.info}>
                                <Text variant="titleMedium">{item.title}</Text>
                                <Text variant="bodySmall" style={styles.location}>
                                    {item.location}
                                </Text>
                                <Text variant="bodyMedium" style={styles.price}>
                                    {item.price}
                                </Text>
                                <Text variant="bodySmall" style={styles.duration}>
                                    {item.duration}
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

