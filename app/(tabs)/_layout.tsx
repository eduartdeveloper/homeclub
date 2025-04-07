import React, { useEffect, useState } from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import PropertiesScreen from './properties';
import BookingsScreen from './bookings';
import SettingsScreen from './settings';
import { RootState } from '@/store';

export default function TabLayout() {
  const router = useRouter();

  // Verifica si el usuario está autenticado
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn]);

  // rutas del tab
  const [routes] = useState([
    {
      key: 'properties',
      title: 'Propiedades',
      focusedIcon: 'home-city',
      unfocusedIcon: 'home-city-outline',
      color: '#e6e6fa',
    },
    {
      key: 'bookings',
      title: 'Reservas',
      focusedIcon: 'calendar-check',
      unfocusedIcon: 'calendar-check-outline',
      color: '#ffe4e1',
    },
    {
      key: 'settings',
      title: 'Config',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
      color: '#e0ffff',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    properties: PropertiesScreen,
    bookings: BookingsScreen,
    settings: SettingsScreen,
  });

  // Si no está logueado, no renderiza nada
  if (!isLoggedIn) return null;

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
        borderWidth: 2,
      }}
    />
  );
}
