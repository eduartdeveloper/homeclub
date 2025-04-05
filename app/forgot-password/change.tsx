import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Text, TextInput, Button, Portal, Dialog, Paragraph, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import BackButton from '@/components/BackButton';
import AlertBox from '@/components/AlertBox';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const colors = useTheme()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    const showAlert = (message: string) => {
        setDialogMessage(message);
        setDialogVisible(true);
    }

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleSave = () => {
        if (password !== confirmPassword) {
            showAlert('Las contraseñas no coinciden');
            return;
        }else{
            setIsSuccess(true)
            showAlert('Contraseña actualizada');
            router.replace('/login');
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
            <Text variant="headlineMedium" style={styles.title}>Cambiar contraseña</Text>
            <Text style={styles.subtitle}>
                Ingresa tu nueva contraseña.
            </Text>

            <TextInput
                label="Nueva contraseña"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <TextInput
                label="Confirmar contraseña"
                mode="outlined"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                right={
                    <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />

            <Button
                mode="contained"
                onPress={handleSave}
                disabled={!password || !confirmPassword}
                style={[
                    styles.button,
                    {
                        backgroundColor: !password || !confirmPassword ? '#929292' : '#000',
                    },
                ]}
                labelStyle={{
                    color: 'white',
                }}
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
    title: {
        textAlign: 'center',
        marginBottom: 32,
        fontSize: 23,
        fontWeight: 800
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
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: '70%'
    },
    logo: {
        width: '100%',
        height: 100,
    }
});
