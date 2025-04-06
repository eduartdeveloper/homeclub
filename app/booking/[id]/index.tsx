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

    const renderPaso = () => {
        switch (pasoActual) {
            case 0: return <Step1 />;
            case 1: return <Step2 range={range} changeRange={setRange} />;
            case 2: return <Step3 selectedPropertyId={id} range={range} />;
            case 3: return <Step4 />;
            default: return null;
        }
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
                    <Button mode="outlined" style={styles.buttonOutlined} labelStyle={{color: '#000'}}  onPress={() => setPasoActual(pasoActual - 1)}>
                        Atrás
                    </Button>
                )}
                {pasoActual < pasos.length - 1 ? (
                    <Button mode="contained" style={styles.buttonContained} onPress={() => setPasoActual(pasoActual + 1)}>
                        Siguiente
                    </Button>
                ) : (
                    <Button mode="contained" style={styles.buttonContained} onPress={() => console.log('Enviar reserva')}>
                        Confirmar y Pagar
                    </Button>
                )}
            </View>
        </View>
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
        borderWidth:2,
        borderColor: "#000"
    },
});
