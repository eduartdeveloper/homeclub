import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Pressable,
} from 'react-native';
import {
    TextInput,
    Button,
    Avatar,
    Text,
    Switch,
    Card,
} from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';

const Tab = createMaterialTopTabNavigator();

function MisDocumentosScreen() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [numeroDoc, setNumeroDoc] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(undefined);
    const [open, setOpen] = useState(false);

    return (
        <ScrollView style={{ padding: 20 }}>
            <TextInput label="Nombre" value={nombre} onChangeText={setNombre} style={{ marginBottom: 10 }} />
            <TextInput label="Apellidos" value={apellido} onChangeText={setApellido} style={{ marginBottom: 10 }} />
            <TextInput label="Tipo de Documento" value={tipoDoc} onChangeText={setTipoDoc} style={{ marginBottom: 10 }} />
            <TextInput label="Número de Documento" value={numeroDoc} onChangeText={setNumeroDoc} style={{ marginBottom: 10 }} />

            {/* Fecha con Pressable */}
            <Pressable onPress={() => setOpen(true)} style={{ marginBottom: 10 }}>
                <TextInput
                    label="Fecha de nacimiento"
                    value={fechaNacimiento ? format(new Date(fechaNacimiento), 'dd/MM/yyyy') : ''}
                    editable={false}
                    pointerEvents="none"
                />
            </Pressable>

            <DatePickerModal
                locale="es"
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={fechaNacimiento ? new Date(fechaNacimiento) : undefined}
                onConfirm={(params) => {
                    setOpen(false);
                    setFechaNacimiento(params.date);
                }}
            />

            <Button mode="contained" onPress={() => console.log('Actualizar info')}>
                Actualizar información
            </Button>
        </ScrollView>
    );
}

function MiPerfilScreen() {
    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <Avatar.Image
                size={100}
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                style={{ marginBottom: 20 }}
            />
            <Text variant="titleMedium">Darrell Steward</Text>
            <Button mode="outlined" style={{ marginTop: 20 }}>
                Cambiar contraseña
            </Button>
        </View>
    );
}

function ConfiguracionScreen() {
    const [isDark, setIsDark] = useState(false);

    return (
        <Card style={{ margin: 20, padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16 }}>Activar tema oscuro</Text>
                <Switch value={isDark} onValueChange={() => setIsDark(!isDark)} />
            </View>
        </Card>
    );
}

export default function ConfiguracionTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Mis Documentos" component={MisDocumentosScreen} />
            <Tab.Screen name="Mi Perfil" component={MiPerfilScreen} />
            <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
        </Tab.Navigator>
    );
}
