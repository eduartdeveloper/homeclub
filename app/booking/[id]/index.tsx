import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ProgressBar, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';


import Step1 from '@/components/booking/Step1Personal';
import Step2 from '@/components/booking/Step2Booking';
import Step3 from '@/components/booking/Step3Review';
import Step4 from '@/components/booking/Step4Pay';
import BackButton from '@/components/BackButton';

const pasos = [
    'Información Personal',
    'Información de la Reserva',
    'Revisa tu Reserva',
    'Pago',
];

export default function ReservaScreen() {
    const { id } = useLocalSearchParams();

    const [pasoActual, setPasoActual] = useState(0);
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [formPaso1, setFormPaso1] = useState({
        nombre: '',
        apellido: '',
        tipoDoc: '',
        numeroDoc: '',
        fechaNacimiento: null,
    });
    const [reservaInfo, setReservaInfo] = useState({
        cantidadPersonas: '',
        horaCheckIn: null,
    });
    const [formPaso4, setFormPaso4] = useState({
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: '',
    });


    const renderPaso = () => {
        switch (pasoActual) {
            case 0: return <Step1 form={formPaso1} setForm={setFormPaso1} />;
            case 1: return (
                <Step2
                    range={range}
                    changeRange={setRange}
                    reservaInfo={reservaInfo}
                    setReservaInfo={setReservaInfo}
                />
            );
            case 2: return <Step3 selectedPropertyId={id} range={range} />;
            case 3: return <Step4 form={formPaso4} setForm={setFormPaso4} />;
            default: return null;
        }
    };

    const validarPaso1 = () => {
        const { nombre, apellido, tipoDoc, numeroDoc, fechaNacimiento } = formPaso1;
        if (!nombre || !apellido || !tipoDoc || !numeroDoc || !fechaNacimiento) {
            alert('Por favor completa todos los campos antes de continuar.');
            return false;
        }

        return true;
    };
    const validarPaso2 = () => {
        const { cantidadPersonas, horaCheckIn } = reservaInfo;
        if (!cantidadPersonas || !horaCheckIn || range.startDate === undefined ) {
            alert('Por favor completa todos los campos antes de continuar.');
            return false;
        }

        return true;
    };
    const validarPaso4 = () => {
        const { cardName, cardNumber, cardMonth, cardYear, cardCvv } = formPaso4;
        
        if (!cardName || !cardNumber || !cardMonth || !cardYear || !cardCvv) {
            alert('Por favor completa todos los campos de la tarjeta.');
            return false;
        }
    
        if (cardNumber.replace(/\s/g, '').length !== 16) {
            alert('Número de tarjeta inválido.');
            return false;
        }
    
        if (parseInt(cardMonth) < 1 || parseInt(cardMonth) > 12) {
            alert('Mes inválido.');
            return false;
        }
    
        if (parseInt(cardYear) < 25) { 
            alert('Año inválido.');
            return false;
        }
    
        if (cardCvv.length < 3 || cardCvv.length > 4) {
            alert('CVC inválido.');
            return false;
        }
    
        // aqui registro la reservaaaaaaaaqa
    };
    

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.titulo}>Reservar Propiedad</Text>

            <ProgressBar
                progress={(pasoActual + 1) / pasos.length}
                color="#000"
                style={styles.progress}
            />
            <Text style={styles.pasoTexto}>{pasos[pasoActual]}</Text>

            <View style={styles.content}>
                {renderPaso()}
            </View>

            <View style={styles.botones}>
                {pasoActual > 0 && (
                    <Button mode="outlined" style={styles.buttonOutlined} labelStyle={{ color: '#000' }} onPress={() => setPasoActual(pasoActual - 1)}>
                        Atrás
                    </Button>
                )}
                {pasoActual < pasos.length - 1 ? (
                    <Button
                        mode="contained"
                        style={styles.buttonContained}
                        onPress={() => {
                            if (pasoActual === 0 && !validarPaso1()) return;
                            if (pasoActual === 1 && !validarPaso2()) return;
                            setPasoActual(pasoActual + 1);
                        }}
                    >
                        Siguiente
                    </Button>
                ) : (
                    <Button mode="contained" style={styles.buttonContained} onPress={validarPaso4}>
                        Confirmar y Pagar
                    </Button>
                )}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 100
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
        backgroundColor: "#000",
        borderRadius: 10
    },
    buttonOutlined: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#000"
    },
});
