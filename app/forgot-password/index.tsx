import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import AlertBox from '@/components/AlertBox';

export default function ForgotPasswordScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const showAlert = (message: string) => {
        setDialogMessage(message);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleSubmit = async () => {
        if (!email.trim()) {
            showAlert('Por favor, ingresa tu correo electrónico.');
            return;
        }

        try {
            const response = await fetch('https://run.mocky.io/v3/1f355184-b062-41d5-81c1-817b36e644cf');
            const data = await response.json();

            const userExists = data.users.some((user: any) => user.email === email.trim());

            if (userExists) {
                router.push('/forgot-password/change');
            } else {
                showAlert('El correo ingresado no está registrado.');
            }
        } catch (error) {
            console.error(error);
            showAlert('Hubo un error al intentar recuperar la cuenta. Intenta más tarde.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/back-splash.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <BackButton />
            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.logoContainer}>
                    <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
                </Text>
            </View>

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

            <Button mode="contained" onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.buttonPrimary }]}>
                Enviar instrucciones
            </Button>

            <AlertBox visible={dialogVisible} onDismiss={hideDialog} message={dialogMessage} />
        </ImageBackground>
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
        color: '#000',
        fontSize: 23,
        fontWeight: '800',
    },
    subtitle: {
        marginBottom: 24,
        textAlign: 'center',
        color: '#000',
    },
    input: {
        marginBottom: 16,
    },
    button: {
        borderRadius: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: '70%',
    },
    logo: {
        width: '100%',
        height: 100,
    },
});
