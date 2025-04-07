import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';


interface DateRange {
    startDate: Date | undefined;
    endDate: Date | undefined;
}

interface ReservaInfo {
    cantidadPersonas: string;
    horaCheckIn: Date | null;
}

interface Step2Props {
    range: DateRange;
    changeRange: (range: DateRange) => void;
    reservaInfo: ReservaInfo;
    setReservaInfo: (info: ReservaInfo) => void;
}

export default function Step2({
    range,
    changeRange,
    reservaInfo,
    setReservaInfo,
}: Step2Props) {
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);

    const onConfirmRange = (params: { startDate: Date; endDate: Date }) => {
        setOpenDate(false);
        changeRange({
            startDate: params.startDate,
            endDate: params.endDate,
        });
    };

    const onConfirmTime = ({ hours, minutes }: { hours: number; minutes: number }) => {
        const selectedTime = new Date();
        selectedTime.setHours(hours);
        selectedTime.setMinutes(minutes);
        setReservaInfo({ ...reservaInfo, horaCheckIn: selectedTime });
        setOpenTime(false);
    };

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 2</Text>

            {/* Cantidad de personas */}
            <TextInput
                label="Cantidad de personas"
                value={reservaInfo.cantidadPersonas}
                onChangeText={(text) =>
                    setReservaInfo({ ...reservaInfo, cantidadPersonas: text })
                }
                keyboardType="numeric"
                style={styles.input}
                mode="outlined"
            />

            {/* Selector de fechas (abre modal) */}
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

            {/* Selector de hora (abre modal) */}
            <Pressable onPress={() => setOpenTime(true)}>
                <TextInput
                    label="Hora de check-in"
                    value={
                        reservaInfo.horaCheckIn ? format(reservaInfo.horaCheckIn, 'HH:mm') : ''
                    }
                    editable={false}
                    style={styles.input}
                    mode="outlined"
                    pointerEvents="none"
                />
            </Pressable>

            <TimePickerModal
                visible={openTime}
                onDismiss={() => setOpenTime(false)}
                onConfirm={onConfirmTime}
                hours={reservaInfo.horaCheckIn?.getHours()}
                minutes={reservaInfo.horaCheckIn?.getMinutes()}
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
    input: {
        marginTop: 20,
    },
});
