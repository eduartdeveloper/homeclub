import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Dialog, Text, Button, Icon } from 'react-native-paper';

type AlertProps = {
    visible: boolean;        // si el diálogo está visible
    onDismiss: () => void;   // función para cerrarlo
    message: string;         // texto del mensaje
    icon?: string;           // ícono opcional (por defecto: información)
    iconColor?: string;      // color del ícono (por defecto: rojo)
};

export default function AlertBox({
    visible,
    onDismiss,
    message,
    icon = 'information',
    iconColor = '#e53935',
}: AlertProps) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <View style={styles.iconContainer}>
                    <Icon source={icon} size={24} color={iconColor} />
                </View>
                <Dialog.Content>
                    <Text style={styles.message}>{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={onDismiss}
                        style={styles.button}
                        labelStyle={{ color: 'black' }}
                    >
                        Aceptar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 16,
        paddingBottom: 8,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
    },
    message: {
        textAlign: 'center',
    },
    button: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 10,
    },
});
