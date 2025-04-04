import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Portal, Dialog, Paragraph } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleSave = () => {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        setVisible(true);
    };

    const handleDialogOk = () => {
        setVisible(false);
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>Cambiar contraseña</Text>

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
                style={styles.button}
                disabled={!password || !confirmPassword}
            >
                Guardar
            </Button>

            {/* Diálogo hermoso nativo de Paper */}
            <Portal>
                <Dialog visible={visible} onDismiss={handleDialogOk}>
                    <Dialog.Title>¡Contraseña actualizada!</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Tu contraseña se ha actualizado exitosamente.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleDialogOk}>Aceptar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
        textAlign: 'center',
        marginBottom: 32,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 12,
        borderRadius: 10,
    },
});
