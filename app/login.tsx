import React, { useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Text, TextInput, Button, useTheme, TouchableRipple, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';


export default function LoginScreen() {
    const { colors } = useTheme();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'guest' | 'owner'>('guest');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        console.log('Email:', email, 'Password:', password);
        router.push('/properties');
    };

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
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode='contain' />
                </Text>
            </View>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableRipple
                    onPress={() => setActiveTab('guest')}
                    style={[
                        styles.tab,
                        activeTab === 'guest' && { backgroundColor: colors.primaryContainer },
                    ]}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'guest' ? 'white' : 'black' }
                        ]}
                    >Invitado</Text>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => setActiveTab('owner')}
                    style={[
                        styles.tab,
                        activeTab === 'owner' && { backgroundColor: colors.primaryContainer },
                    ]}
                >
                    <Text
                        style={[
                            styles.tabText,
                            { color: activeTab === 'owner ' ? 'white' : 'black' }
                        ]}
                    >Propietario</Text>
                </TouchableRipple>
            </View>

            {/* Contenido del tab */}
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

                    <Button mode="contained" onPress={handleLogin} style={[styles.button, { backgroundColor: colors.buttonPrimary }]}>
                        Iniciar sesión
                    </Button>

                    <Button onPress={handlePasswordReset} compact style={{ paddingTop: 20, borderRadius: 10 }} labelStyle={{ color: 'black' }}>
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
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: 60
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
        fontSize: 18
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 12,
        borderRadius: 10
    },
    ownerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 16,
    },
    logoContainer: {
        width: '70%'
    },
    logo: {
        width: '100%',
        height: 100,
    }
});
