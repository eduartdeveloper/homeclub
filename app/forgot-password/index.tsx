import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log('Enviar enlace a:', email);
        // Aquí podrías hacer la petición a tu API
        router.push('/forgot-password/change'); // Ir a cambiar contraseña
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Recuperar contraseña
            </Text>

            <Text style={styles.subtitle}>
                Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
            </Text>

            <TextInput
                label="Correo electrónico"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Enviar instrucciones
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    title: {
        marginBottom: 12,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        marginBottom: 24,
        textAlign: 'center',
        color: '#666',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        borderRadius: 10,
    },
});
