import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text, TextInput, Button, useTheme, TouchableRipple } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { decode as atob } from 'base-64';
import AlertBox from '@/components/AlertBox';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import { RootState } from '@/store';


type TabType = 'guest' | 'owner';

interface User {
    email: string;
    password: string;
    [key: string]: any;
}

export default function LoginScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    
    const [activeTab, setActiveTab] = useState<TabType>('guest');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);
    const [dialogMessage, setDialogMessage] = useState<string>('');

    
    const showAlert = (message: string) => {
        setDialogMessage(message);
        setDialogVisible(true);
    };

    
    const hideDialog = () => {
        setDialogVisible(false);
    };

    // logica de validaCION LOGIN
    const handleLogin = async () => {
        if (!email || !password) {
            showAlert('Por favor ingresa tu correo y contraseña.');
            return;
        }

        try {
            const response = await fetch('https://run.mocky.io/v3/1f355184-b062-41d5-81c1-817b36e644cf');
            const data = await response.json();

            const foundUser = data.users.find((user: User) => {
                const decodedPassword = atob(user.password);
                return user.email === email && decodedPassword === password;
            });

            if (foundUser) {
                dispatch(login(foundUser));
                router.push('/properties');
            } else {
                showAlert('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            showAlert('Error al intentar iniciar sesión. Intenta más tarde.');
            console.error(error);
        }
    };

    // Redireccionar si ya está logueado
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoggedIn) {
                router.replace('/properties');
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [isLoggedIn]);

    
    const handlePasswordReset = () => {
        router.push('/forgot-password');
    };

    return (
        <ImageBackground
            source={require('../assets/images/back-splash.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.header}>
                <Text variant="headlineLarge" style={styles.logoContainer}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
                </Text>
            </View>

            {/* Tabs de invitado y propietario */}
            <View style={styles.tabContainer}>
                <TouchableRipple
                    onPress={() => setActiveTab('guest')}
                    style={[styles.tab, activeTab === 'guest' && { backgroundColor: colors.primaryContainer }]}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'guest' ? 'white' : 'black' }]}>Invitado</Text>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => setActiveTab('owner')}
                    style={[styles.tab, activeTab === 'owner' && { backgroundColor: colors.primaryContainer }]}
                >
                    <Text style={[styles.tabText, { color: activeTab === 'owner' ? 'white' : 'black' }]}>Propietario</Text>
                </TouchableRipple>
            </View>

            {activeTab === 'guest' ? (
                <>
                    <TextInput
                        label="Correo electrónico"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        label="Contraseña"
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
                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
                    >
                        Iniciar sesión
                    </Button>

                    <Button
                        onPress={handlePasswordReset}
                        compact
                        style={{ paddingTop: 20, borderRadius: 10 }}
                        labelStyle={{ color: 'black' }}
                    >
                        ¿Olvidaste tu contraseña? Restablecer
                    </Button>
                </>
            ) : (
                <View style={styles.ownerContent}>
                    <Text variant="titleLarge" style={{ textAlign: 'center' }}>
                        Esta función está en desarrollo 🛠️
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 8 }}>
                        Muy pronto estará disponible para propietarios.
                    </Text>
                </View>
            )}

            <AlertBox visible={dialogVisible} onDismiss={hideDialog} message={dialogMessage} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60,
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
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        borderRadius: 12,
        overflow: 'hidden',
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
    },
    tabText: {
        fontWeight: '600',
        fontFamily: 'EspecialFont',
        fontSize: 18,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 12,
        borderRadius: 10,
    },
    ownerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 16,
    },
});
