import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import AlertBox from '@/components/AlertBox';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [dialogMessage, setDialogMessage] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const showAlert = (message: string) => {
        setDialogMessage(message);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        if (isSuccess) {
            router.replace('/')
        }
    };

    // Validar y manejar el guardado de la contraseña
    const handleSave = () => {
        if (password !== confirmPassword) {
            showAlert('Las contraseñas no coinciden');
            return;
        }

        setIsSuccess(true);
        showAlert('Contraseña actualizada');
    };

    const passwordIcon = (
        <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
        />
    );

    return (
        <ImageBackground
            source={require('../../assets/images/back-splash.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <BackButton />

            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Text>
            </View>

            <Text variant="headlineMedium" style={styles.title}>Cambiar contraseña</Text>
            <Text style={styles.subtitle}>Ingresa tu nueva contraseña.</Text>

            {/* Campo Nueva Contraseña */}
            <TextInput
                label="Nueva contraseña"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                right={passwordIcon}
            />

            {/* Campo Confirmar Contraseña */}
            <TextInput
                label="Confirmar contraseña"
                mode="outlined"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                right={passwordIcon}
            />

            <Button
                mode="contained"
                onPress={handleSave}
                disabled={!password || !confirmPassword}
                style={[
                    styles.button,
                    { backgroundColor: !password || !confirmPassword ? '#929292' : colors.buttonPrimary || '#000' }
                ]}
                labelStyle={{ color: '#FFF' }}
            >
                Guardar
            </Button>

            <AlertBox
                visible={dialogVisible}
                onDismiss={hideDialog}
                message={dialogMessage}
                {...(isSuccess && {
                    icon: 'check-circle',
                    iconColor: '#046974',
                })}
            />
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
    title: {
        textAlign: 'center',
        marginBottom: 32,
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
        marginTop: 12,
        borderRadius: 10,
    },
});
