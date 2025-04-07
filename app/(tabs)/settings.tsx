import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Text, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { encode as btoa } from 'base-64';
import { logout } from '@/store/slices/authSlice';
import AlertBox from '@/components/AlertBox';
import type { RootState } from '@/store'; 

export default function MiPerfilScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const profileImage = user?.username === 'jose'
        ? require('../../assets/images/men.png')
        : require('../../assets/images/women.png');

    //cerrar sesión
    const logOutHandle = () => {
        dispatch(logout());
        router.push('/');
    };

    const showAlert = (message: string, success = false) => {
        setIsSuccess(success);
        setDialogMessage(message);
        setDialogVisible(true);
    };
    const hideDialog = () => {
        setDialogVisible(false);
    };

    // Validación y cambio de contraseña
    const handleChangePassword = () => {
        const encodedCurrentPassword = btoa(currentPassword);

        if (encodedCurrentPassword !== user?.password) {
            return showAlert('La contraseña actual es incorrecta');
        }

        if (newPassword.length < 6) {
            return showAlert('La nueva contraseña debe tener al menos 6 caracteres');
        }

        if (newPassword !== confirmPassword) {
            return showAlert('Las nuevas contraseñas no coinciden');
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        showAlert('Contraseña actualizada correctamente', true);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50, alignItems: 'center' }}>
            <Avatar.Image size={100} source={profileImage} style={{ marginBottom: 20 }} />

            <Text variant="titleMedium" style={{ marginBottom: 20 }}>
                {user?.name || 'Nombre no disponible'}
            </Text>

            {/* contraseña actual */}
            <TextInput
                label="Contraseña actual"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrent}
                style={{ width: '100%', marginBottom: 10 }}
                mode="outlined"
                right={
                    <TextInput.Icon
                        icon={showCurrent ? 'eye-off' : 'eye'}
                        onPress={() => setShowCurrent(!showCurrent)}
                    />
                }
            />

            {/* nueva contraseña */}
            <TextInput
                label="Nueva contraseña"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNew}
                style={{ width: '100%', marginBottom: 10 }}
                mode="outlined"
                right={
                    <TextInput.Icon
                        icon={showNew ? 'eye-off' : 'eye'}
                        onPress={() => setShowNew(!showNew)}
                    />
                }
            />

            {/* repetir nueva contraseña */}
            <TextInput
                label="Repetir nueva contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                style={{ width: '100%', marginBottom: 10 }}
                mode="outlined"
                right={
                    <TextInput.Icon
                        icon={showConfirm ? 'eye-off' : 'eye'}
                        onPress={() => setShowConfirm(!showConfirm)}
                    />
                }
            />

            <Button
                mode="contained"
                style={{ width: '100%', marginBottom: 10, borderRadius: 10 }}
                onPress={handleChangePassword}
            >
                Cambiar contraseña
            </Button>

            <Button
                mode="outlined"
                style={{ width: '100%', borderRadius: 10, borderWidth: 2 }}
                onPress={logOutHandle}
            >
                Cerrar sesión
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
        </ScrollView>
    );
}
