import React from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const properties = [
    {
        id: "1",
        title: "Home in Dickinson",
        location: "1714 Mackey DR Dickinson, TX",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
        rating: 3.8,
        bedrooms: 4,
        bathrooms: 2,
        size: "1,903 ft",
        price: "$615,000"
    },
    {
        id: "2",
        title: "Madrid",
        location: "1714 Mackey DR Dickinson, TX",
        image: "https://images.pexels.com/photos/12603563/pexels-photo-12603563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        rating: 3.8,
        bedrooms: 4,
        bathrooms: 2,
        size: "1,903 ft",
        price: "$615,000"
    },
];

export default function PropertiesScreen() {
    const router = useRouter()

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.username}>Darrell Steward</Text>
                <Image
                    source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                    style={styles.profileImage}
                />
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <MaterialCommunityIcons name="magnify" size={24} color="gray" />
                <TextInput placeholder="Search..." style={styles.searchInput} />
                <MaterialCommunityIcons name="filter-variant" size={24} color="gray" />
            </View>

            {/* Filters */}
            <View style={styles.filters}>
                <TouchableOpacity style={styles.activeFilter}>
                    <Text style={styles.activeFilterText}>For Sale</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <Text>For Rent</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <Text>By Map</Text>
                </TouchableOpacity>
            </View>

            {/* Property List */}
            <FlatList
                data={properties}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => router.push(`/property/2`)}>
                        <Image source={{ uri: item.image }} style={styles.propertyImage} />
                        <View style={styles.backgoundfloatingButton}></View>
                        <View style={styles.backgoundfloatingButtonc1}></View>
                        <View style={styles.backgoundfloatingButtonc2}></View>
                        <View style={styles.floatingButton}>
                            <MaterialCommunityIcons name="arrow-top-right" size={24} color="black" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.price}>{item.price}</Text>
                            <Text style={styles.propertyTitle}>{item.title}</Text>
                            <Text style={styles.propertyLocation}>{item.location}</Text>
                            <View style={styles.propertyDetails}>
                                <MaterialCommunityIcons name="bed" size={15} color="white" style={styles.detailIcon} />
                                <Text style={styles.detailText}>{item.bedrooms}</Text>
                                <MaterialCommunityIcons name="shower" size={15} color="white" style={styles.detailIcon} />
                                <Text style={styles.detailText}>{item.bathrooms}</Text>
                                <MaterialCommunityIcons name="ruler" size={15} color="white" style={styles.detailIcon} />
                                <Text style={styles.detailText}>{item.size}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 8,
        marginTop: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
    },
    filters: {
        flexDirection: "row",
        marginTop: 16,
    },
    activeFilter: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    activeFilterText: {
        color: "white",
    },
    filter: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    card: {
        marginTop: 20,
        borderRadius: 50,
        overflow: "hidden",
        width: "100%",
        aspectRatio: 1,
        position: "relative"
    },
    propertyImage: {
        height: "100%",
        width: "100%",
        objectFit: "cover"
    },
    backgoundfloatingButton: {
        position: "absolute",
        backgroundColor: 'white',
        width: 100,
        height: 100,
        top: 0,
        right: 0,
        borderBottomLeftRadius: 50
    },
    backgoundfloatingButtonc1: {
        backgroundColor: "transparent",
        position: "absolute",
        width: 50,
        height: 50,
        borderTopRightRadius: 25,
        top: 0,
        right: 100,
        boxShadow: '7px -6px 0px 5px white'
    },
    backgoundfloatingButtonc2: {
        backgroundColor: "transparent",
        position: "absolute",
        width: 50,
        height: 50,
        borderTopRightRadius: 25,
        top: 100,
        right: 0,
        boxShadow: '7px -6px 0px 5px white'
    },
    floatingButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "yellow",
        padding: 8,
        borderRadius: 50,
    },
    cardContent: {
        padding: 16,
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: "90%",
        bottom: 15,
        left: "5%",
        borderRadius: 25,

    },
    propertyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },
    propertyLocation: {
        color: "white",
        fontSize: 12,
    },
    propertyDetails: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    detailText: {
        marginLeft: 4,
        marginRight: 15,
        color: "white"
    },
    detailIcon: {
        backgroundColor: 'rgba(255,255,255,0.s)',
        padding: 5,
        borderRadius: 20
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        position: "absolute",
        top: 16,
        right: 16
    },
});
