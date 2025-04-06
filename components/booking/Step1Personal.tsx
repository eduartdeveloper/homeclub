import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import { subYears } from 'date-fns';

export default function Step1({ form, setForm }) {
    
    const [open, setOpen] = useState(false);

    const fechaMaxima = subYears(new Date(), 18);

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 1:</Text>
            <Text style={styles.texto}>Por favor ingresa tu información personal</Text>
            <ScrollView style={{ padding: 20 }}>
                <TextInput label="Nombre" value={form.nombre} onChangeText={(text) => setForm( {...form, nombre:text} )} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Apellidos" value={form.apellido} onChangeText={(text) => setForm( {...form, apellido:text} )} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Tipo de Documento" value={form.tipoDoc} onChangeText={(text) => setForm( {...form, tipoDoc:text} )} style={{ marginBottom: 10 }} mode="outlined" />
                <TextInput label="Número de Documento" value={form.numeroDoc} onChangeText={(text) => setForm( {...form, numeroDoc:text} )} style={{ marginBottom: 10 }} mode="outlined" />

                {/* Fecha con Pressable */}
                <Pressable onPress={() => setOpen(true)} style={{ marginBottom: 10 }}>
                    <TextInput
                        label="Fecha de nacimiento"
                        value={form.fechaNacimiento ? format(new Date(form.fechaNacimiento), 'dd/MM/yyyy') : ''}
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
                    date={form.fechaNacimiento ? new Date(form.fechaNacimiento) : fechaMaxima} // 👈 por defecto selecciona 18 años atrás
                    onConfirm={(params) => {
                        setOpen(false);
                        setForm({ ...form, fechaNacimiento: params.date });
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
