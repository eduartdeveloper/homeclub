import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, TextInput } from 'react-native-paper';

const tiposDocumento = [
    'Cédula de Ciudadanía',
    'NIT',
    'Tarjeta de Identidad',
    'NUI',
];

export default function TipoDocumentoSelector({ value, onChange }) {
    const [visible, setVisible] = useState(false);
    const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });

    return (
        <View
            style={{ marginBottom: 10 }}
            onLayout={(event) => {
                const { x, y } = event.nativeEvent.layout;
                setAnchorPosition({ x, y });
            }}
        >
            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchorPosition="top"
                anchor={
                    <TextInput
                        label="Tipo de Documento"
                        value={value}
                        editable={false}
                        onPressIn={() => setVisible(true)}
                        right={<TextInput.Icon icon="menu-down" />}
                        mode="outlined"
                    />
                }
            >
                {tiposDocumento.map((tipo, index) => (
                    <Menu.Item
                        key={index}
                        title={tipo}
                        onPress={() => {
                            onChange(tipo);
                            setVisible(false);
                        }}
                    />
                ))}
            </Menu>
        </View>
    );
}
