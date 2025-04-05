import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { withLayoutContext } from "expo-router"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "react-native-paper"

import PropertiesScreen from "./properties"
import BookingsScreen from "./bookings"
import SettingsScreen from "./settings"

const Tab = createBottomTabNavigator()
const Tabs = withLayoutContext(Tab.Navigator)

export default function TabLayout() {
  const { colors } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 6,
          paddingTop: 4,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="properties"
        options={{
          tabBarLabel: 'Propiedades',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-city" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-check" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: 'Configuración',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}