import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function PropertiesScreen() {
    const router = useRouter();
    const user = useSelector(state => state.auth.user);
    const profileImage = user.username === "jose"
        ? require('../../assets/images/men.png')
        : require('../../assets/images/women.png');

    const [allProperties, setAllProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("Todas");
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        fetch("https://run.mocky.io/v3/60d668c2-70e8-4597-ac4c-d881dd9aaaad")
            .then(res => res.json())
            .then(data => {
                setAllProperties(data);
                setFilteredProperties(data);
                // Extraer ciudades únicas
                const uniqueCities = ["Todas", ...new Set(data.map(item => item.city))];
                setCities(uniqueCities);
            });
    }, []);

    const filterByCity = (city) => {
        setSelectedCity(city);
        const filtered = allProperties.filter(item => {
            const matchCity = city === "Todas" || item.city === city;
            const matchSearch = item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                item.location.toLowerCase().includes(searchText.toLowerCase());
            return matchCity && matchSearch;
        });
        setFilteredProperties(filtered);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = allProperties.filter(item => {
            const matchCity = selectedCity === "Todas" || item.city === selectedCity;
            const matchSearch = item.title.toLowerCase().includes(text.toLowerCase()) ||
                item.location.toLowerCase().includes(text.toLowerCase());
            return matchCity && matchSearch;
        });
        setFilteredProperties(filtered);
    };

    const formatCOP = (value) => {
        return new Intl.NumberFormat('es-CO').format(value);
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.username}>{user.name}</Text>
                <Image source={profileImage} style={styles.profileImage} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <MaterialCommunityIcons name="magnify" size={24} color="gray" />
                <TextInput placeholder="Buscar..." style={styles.searchInput} onChangeText={handleSearch} />
            </View>

            {/* City Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
                {cities.map(city => (
                    <TouchableOpacity
                        key={city}
                        style={city === selectedCity ? styles.activeFilter : styles.filter}
                        onPress={() => filterByCity(city)}
                    >
                        <Text style={city === selectedCity ? styles.activeFilterText : null}>
                            {city}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Property List */}
            <FlatList
                data={filteredProperties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => router.push(`/property/${item.id}`)}>
                        <Image source={{ uri: item.image }} style={styles.propertyImage} />
                        <View style={styles.backgoundfloatingButton}></View>
                        <View style={styles.backgoundfloatingButtonc1}></View>
                        <View style={styles.backgoundfloatingButtonc2}></View>
                        <View style={styles.floatingButton}>
                            <MaterialCommunityIcons name="arrow-top-right" size={24} color="white" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.price}>${formatCOP(item.price)}<Text style={{fontSize: 12}}>/ mes</Text></Text>
                            <Text style={styles.propertyTitle}>{item.title}</Text>
                            <Text style={styles.propertyLocation}>{item.location}</Text>
                            <View style={styles.propertyDetails}>
                                <MaterialCommunityIcons name="bed-outline" size={15} color="white" style={styles.detailIcon} />
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
        paddingTop: 50
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
        paddingBottom: 20,
    },
    activeFilter: {
        backgroundColor: "#000000",
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
        height: 40
    },
    activeFilterText: {
        color: "white",
    },
    filter: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
        height: 40
    },
    card: {
        marginTop: 20,
        borderRadius: 50,
        overflow: "hidden",
        width: "100%",
        aspectRatio: 1,
        position: "relative",
        elevation: 0,
    },
    propertyImage: {
        height: "100%",
        width: "100%",
        objectFit: "cover"
    },
    floatingButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#000000",
        padding: 8,
        borderRadius: 50,
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center'
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
        color: "white",
        width: '60%'
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
    backgoundfloatingButton: {
        position: "absolute",
        backgroundColor: '#F8F9FA',
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
        boxShadow: '7px -6px 0px 5px #F8F9FA'
    },
    backgoundfloatingButtonc2: {
        backgroundColor: "transparent",
        position: "absolute",
        width: 50,
        height: 50,
        borderTopRightRadius: 25,
        top: 100,
        right: 0,
        boxShadow: '7px -6px 0px 5px #F8F9FA'
    },
});
