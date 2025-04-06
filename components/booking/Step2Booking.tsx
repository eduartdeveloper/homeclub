import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';

export default function Step2({ range, changeRange }) {
    const [cantidadPersonas, setCantidadPersonas] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    // const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [horaCheckIn, setHoraCheckIn] = useState(undefined);

    const onConfirmRange = (params) => {
        setOpenDate(false);
        changeRange({
            startDate: params.startDate,
            endDate: params.endDate,
        });
    };

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 2</Text>
            <Text style={styles.texto}>Fechas, número de personas, peticiones especiales...</Text>

            <TextInput
                label="Cantidad de personas"
                value={cantidadPersonas}
                onChangeText={setCantidadPersonas}
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
            />

            {/* Selector de Fechas */}
            <Pressable onPress={() => setOpenDate(true)}>
                <TextInput
                    label="Fechas de reserva"
                    value={
                        range.startDate && range.endDate
                            ? `${format(range.startDate, 'dd/MM/yyyy')} - ${format(range.endDate, 'dd/MM/yyyy')}`
                            : ''
                    }
                    editable={false}
                    style={styles.input}
                    mode="outlined"
                    pointerEvents="none"
                />
            </Pressable>

            <DatePickerModal
                locale="es"
                mode="range"
                visible={openDate}
                onDismiss={() => setOpenDate(false)}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirmRange}
            />

            {/* Selector de Hora */}
            <Pressable onPress={() => setOpenTime(true)}>
                <TextInput
                    label="Hora de check-in"
                    value={horaCheckIn ? format(horaCheckIn, 'HH:mm') : ''}
                    editable={false}
                    style={styles.input}
                    mode="outlined"
                    pointerEvents="none"
                />
            </Pressable>

            <TimePickerModal
                visible={openTime}
                onDismiss={() => setOpenTime(false)}
                onConfirm={({ hours, minutes }) => {
                    const selectedTime = new Date();
                    selectedTime.setHours(hours);
                    selectedTime.setMinutes(minutes);
                    setHoraCheckIn(selectedTime);
                    setOpenTime(false);
                }}
                hours={horaCheckIn?.getHours()}
                minutes={horaCheckIn?.getMinutes()}
                locale="es"
                label="Selecciona hora de check-in"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    texto: {
        marginTop: 10,
        color: '#444',
    },
    input: {
        marginTop: 20,
    },
});
