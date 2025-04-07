import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';
import Step1 from '@/components/booking/Step1Personal';
import Step2 from '@/components/booking/Step2Booking';
import Step3 from '@/components/booking/Step3Review';
import Step4 from '@/components/booking/Step4Pay';
import BackButton from '@/components/BackButton';
import AlertBox from '@/components/AlertBox';


interface PersonalInfo {
    nombre: string;
    apellido: string;
    tipoDoc: string;
    numeroDoc: string;
    fechaNacimiento: Date | null;
}

interface ReservaInfo {
    cantidadPersonas: string;
    horaCheckIn: Date | null;
}

interface DateRange {
    startDate?: Date;
    endDate?: Date;
}

interface CardInfo {
    cardName: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
}

const steps = [
    'Información Personal',
    'Información de la Reserva',
    'Revisa tu Reserva',
    'Pago',
];

export default function ReservaScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [pasoActual, setPasoActual] = useState(0);
    const [range, setRange] = useState<DateRange>({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formPaso1, setFormPaso1] = useState<PersonalInfo>({
        nombre: '',
        apellido: '',
        tipoDoc: '',
        numeroDoc: '',
        fechaNacimiento: null,
    });
    const [reservaInfo, setReservaInfo] = useState<ReservaInfo>({
        cantidadPersonas: '',
        horaCheckIn: null,
    });
    const [formPaso4, setFormPaso4] = useState<CardInfo>({
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
    });

    const showAlert = (message: string) => {
        setDialogMessage(message);
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
        if (isSuccess) {
            router.push('/bookings');
        }
    };

    // PASOS
    const renderPaso = () => {
        switch (pasoActual) {
            case 0:
                return <Step1 form={formPaso1} setForm={setFormPaso1} />;
            case 1:
                return (
                    <Step2
                        range={range}
                        changeRange={setRange}
                        reservaInfo={reservaInfo}
                        setReservaInfo={setReservaInfo}
                    />
                );
            case 2:
                return <Step3 selectedPropertyId={id} range={range} />;
            case 3:
                return <Step4 form={formPaso4} setForm={setFormPaso4} />;
            default:
                return null;
        }
    };

    // validaciones de formularios
    const validarPaso1 = (): boolean => {
        const { nombre, apellido, tipoDoc, numeroDoc, fechaNacimiento } = formPaso1;
        if (!nombre || !apellido || !tipoDoc || !numeroDoc || !fechaNacimiento) {
            showAlert('Por favor completa todos los campos antes de continuar.');
            return false;
        }
        return true;
    };

    const validarPaso2 = (): boolean => {
        const { cantidadPersonas, horaCheckIn } = reservaInfo;
        if (!cantidadPersonas || !horaCheckIn || !range.startDate) {
            showAlert('Por favor completa todos los campos antes de continuar.');
            return false;
        }
        return true;
    };

    const validarPaso4 = (): void => {
        const { cardName, cardNumber, cardMonth, cardYear, cardCvv } = formPaso4;

        if (!cardName || !cardNumber || !cardMonth || !cardYear || !cardCvv) {
            showAlert('Por favor completa todos los campos de la tarjeta.');
            return;
        }

        const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
        if (sanitizedCardNumber.length !== 16) {
            showAlert('Número de tarjeta inválido.');
            return;
        }

        const mes = parseInt(cardMonth);
        if (mes < 1 || mes > 12) {
            showAlert('Mes inválido.');
            return;
        }

        const año = parseInt(cardYear);
        if (año < 25) {
            showAlert('Año inválido.');
            return;
        }

        if (cardCvv.length < 3 || cardCvv.length > 4) {
            showAlert('CVC inválido.');
            return;
        }

        setIsSuccess(true);
        showAlert('Felicidades, tu reserva se ha generado exitosamente');
    };

    const avanzarPaso = () => {
        if (pasoActual === 0 && !validarPaso1()) return;
        if (pasoActual === 1 && !validarPaso2()) return;
        setPasoActual(pasoActual + 1);
    };

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.titulo}>Reservar Propiedad</Text>

            <ProgressBar
                progress={(pasoActual + 1) / steps.length}
                color="#000"
                style={styles.progress}
            />
            <Text style={styles.pasoTexto}>{steps[pasoActual]}</Text>

            <View style={styles.content}>{renderPaso()}</View>

            <View style={styles.botones}>
                {pasoActual > 0 && (
                    <Button
                        mode="outlined"
                        style={styles.buttonOutlined}
                        labelStyle={{ color: '#000' }}
                        onPress={() => setPasoActual(pasoActual - 1)}
                    >
                        Atrás
                    </Button>
                )}

                {pasoActual < steps.length - 1 ? (
                    <Button mode="contained" style={styles.buttonContained} onPress={avanzarPaso}>
                        Siguiente
                    </Button>
                ) : (
                    <Button mode="contained" style={styles.buttonContained} onPress={validarPaso4}>
                        Confirmar y Pagar
                    </Button>
                )}
            </View>

            <AlertBox
                visible={dialogVisible}
                onDismiss={hideDialog}
                message={dialogMessage}
                {...(isSuccess && {
                    icon: 'check-circle',
                    iconColor: '#046974',
                })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    progress: {
        height: 8,
        borderRadius: 4,
        marginBottom: 10,
    },
    pasoTexto: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
    },
    content: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    botones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonContained: {
        backgroundColor: '#000',
        borderRadius: 10,
    },
    buttonOutlined: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
});
