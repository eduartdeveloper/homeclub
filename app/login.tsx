import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
    };

    const handlePasswordReset = () => {
        router.push('/forgot-password');
    };

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableRipple
                    onPress={() => setActiveTab('guest')}
                    style={[
                        styles.tab,
                        activeTab === 'guest' && { backgroundColor: colors.primaryContainer },
                    ]}
                >
                    <Text style={styles.tabText}>Invitado</Text>
                </TouchableRipple>
                <TouchableRipple
                    onPress={() => setActiveTab('owner')}
                    style={[
                        styles.tab,
                        activeTab === 'owner' && { backgroundColor: colors.primaryContainer },
                    ]}
                >
                    <Text style={styles.tabText}>Propietario</Text>
                </TouchableRipple>
            </View>

            {/* Contenido del tab */}
            {activeTab === 'guest' ? (
                <>
                    <View style={styles.header}>
                        <Text variant="headlineLarge" style={{ color: colors.primary }}>
                            Logo
                        </Text>
                    </View>

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

                    <Button mode="contained" onPress={handleLogin} style={styles.button}>
                        Iniciar sesión
                    </Button>

                    <Button onPress={handlePasswordReset} compact>
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
});
