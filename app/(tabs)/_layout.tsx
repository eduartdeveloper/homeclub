import React, { useEffect, useState } from "react";
import { BottomNavigation, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

// Tus pantallas
import PropertiesScreen from "./properties";
import BookingsScreen from "./bookings";
import SettingsScreen from "./settings";

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useTheme();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  const [routes] = useState([
    {
      key: 'properties',
      title: 'Propiedades',
      focusedIcon: 'home-city',
      unfocusedIcon: 'home-city-outline',
      color: '#e6e6fa' // o el color de fondo que quieres cuando está activo
    },
    {
      key: 'bookings',
      title: 'Reservas',
      focusedIcon: 'calendar-check',
      unfocusedIcon: 'calendar-check-outline',
      color: '#ffe4e1'
    },
    {
      key: 'settings',
      title: 'Config',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
      color: '#e0ffff'
    },
  ]);
  

  const renderScene = BottomNavigation.SceneMap({
    properties: PropertiesScreen,
    bookings: BookingsScreen,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
      activeColor="black"
      inactiveColor="#929292"
      barStyle={{
        backgroundColor: '#f2f2f2',
      }}
      activeIndicatorStyle={{
        backgroundColor: 'transparent',
        borderWidth: 2
      }}
    />
  );
}
