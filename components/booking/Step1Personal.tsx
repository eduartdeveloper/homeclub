import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import { subYears } from 'date-fns';

export default function Step1() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('');
    const [numeroDoc, setNumeroDoc] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(undefined);
    const [open, setOpen] = useState(false);

    const fechaMaxima = subYears(new Date(), 18);

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 1:</Text>
            <Text style={styles.texto}>Por favor ingresa tu información personal</Text>
            <ScrollView style={{ padding: 20 }}>
                <TextInput label="Nombre" value={nombre} onChangeText={setNombre} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Apellidos" value={apellido} onChangeText={setApellido} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Tipo de Documento" value={tipoDoc} onChangeText={setTipoDoc} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Número de Documento" value={numeroDoc} onChangeText={setNumeroDoc} style={{ marginBottom: 10 }} mode="outlined" />

                {/* Fecha con Pressable */}
                <Pressable onPress={() => setOpen(true)} style={{ marginBottom: 10 }}>
                    <TextInput
                        label="Fecha de nacimiento"
                        value={fechaNacimiento ? format(new Date(fechaNacimiento), 'dd/MM/yyyy') : ''}
                        editable={false}
                        pointerEvents="none"
                        mode="outlined"
                    />
                    <Text style={{ color: '#cc1313', marginTop: 10 }}>
                        * Debes ser mayor de 18 años para continuar
                    </Text>
                </Pressable>


                <DatePickerModal
                    locale="es"
                    mode="single"
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    date={fechaNacimiento ? new Date(fechaNacimiento) : fechaMaxima} // 👈 por defecto selecciona 18 años atrás
                    onConfirm={(params) => {
                        setOpen(false);
                        setFechaNacimiento(params.date);
                    }}
                    validRange={{
                        endDate: fechaMaxima,
                    }}
                />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    texto: {
        marginTop: 10,
        color: '#444',
    },
});
