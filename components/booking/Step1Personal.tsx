import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format, subYears } from 'date-fns';

interface FormData {
    nombre: string;
    apellido: string;
    tipoDoc: string;
    numeroDoc: string;
    fechaNacimiento: Date | null;
}


interface Step1Props {
    form: FormData;
    setForm: (form: FormData) => void;
}

export default function Step1({ form, setForm }: Step1Props) {
    const [open, setOpen] = useState(false);

    // Fecha máxima permitida (mayores de 18 años)
    const fechaMaxima = subYears(new Date(), 18);

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 1:</Text>
            <Text style={styles.texto}>Por favor ingresa tu información personal</Text>

            <ScrollView style={styles.scroll}>
                {/* Nombre */}
                <TextInput
                    label="Nombre"
                    value={form.nombre}
                    onChangeText={(text) => setForm({ ...form, nombre: text })}
                    style={styles.input}
                    mode="outlined"
                />

                {/* Apellido */}
                <TextInput
                    label="Apellidos"
                    value={form.apellido}
                    onChangeText={(text) => setForm({ ...form, apellido: text })}
                    style={styles.input}
                    mode="outlined"
                />

                {/* Tipo de Documento */}
                <TextInput
                    label="Tipo de Documento"
                    value={form.tipoDoc}
                    onChangeText={(text) => setForm({ ...form, tipoDoc: text })}
                    style={styles.input}
                    mode="outlined"
                />

                {/* Número de Documento */}
                <TextInput
                    label="Número de Documento"
                    value={form.numeroDoc}
                    onChangeText={(text) => setForm({ ...form, numeroDoc: text })}
                    style={styles.input}
                    mode="outlined"
                />

                {/* Fecha de nacimiento (usamos Pressable para abrir el picker) */}
                <Pressable onPress={() => setOpen(true)} style={styles.input}>
                    <TextInput
                        label="Fecha de nacimiento"
                        value={form.fechaNacimiento ? format(new Date(form.fechaNacimiento), 'dd/MM/yyyy') : ''}
                        editable={false}
                        pointerEvents="none"
                        mode="outlined"
                    />
                    <Text style={styles.advertencia}>
                        * Debes ser mayor de 18 años para continuar
                    </Text>
                </Pressable>

                {/* Modal de selección de fecha */}
                <DatePickerModal
                    locale="es"
                    mode="single"
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    date={form.fechaNacimiento ? new Date(form.fechaNacimiento) : fechaMaxima}
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
    scroll: {
        padding: 20,
    },
    texto: {
        marginTop: 10,
        color: '#444',
    },
    input: {
        marginBottom: 10,
    },
    advertencia: {
        color: '#cc1313',
        marginTop: 10,
    },
});
