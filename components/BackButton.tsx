import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface BackButtonProps {
    iconColor?: string;         // color del ícono
    containerColor?: string;    // color de fondo del botón
    style?: ViewStyle;          // estilos extra para el botón
    onPress?: () => void;       // función al presionar el botón
}

const BackButton: React.FC<BackButtonProps> = ({
    iconColor = '#000',
    containerColor = '#fff',
    style,
    onPress,
}) => {
    const router = useRouter();

    return (
        <IconButton
            icon="arrow-left"
            size={24}
            onPress={onPress ?? (() => router.back())}
            style={[styles.backButton, style]}
            mode="contained"
            containerColor={containerColor}
            iconColor={iconColor}
        />
    );
};

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#000',
    },
});

export default BackButton;
