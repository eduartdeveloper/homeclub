import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { differenceInCalendarDays } from 'date-fns';

interface Property {
    id: string;
    title: string;
    image: string;
    location: string;
    city: string;
    price: number;
}

interface Range {
    startDate: Date;
    endDate: Date;
}

interface Step3Props {
    selectedPropertyId: string;
    range?: Range;
}


export default function Step3({ selectedPropertyId, range }: Step3Props) {
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Formatear valor a pesos colombianos
    const formatCOP = (value: number): string => {
        return new Intl.NumberFormat('es-CO').format(value);
    };

    // Obtener datos de propiedad al montar o cambiar el ID
    useEffect(() => {
        fetch('https://run.mocky.io/v3/60d668c2-70e8-4597-ac4c-d881dd9aaaad')
            .then(res => res.json())
            .then((data: Property[]) => {
                const found = data.find(p => p.id === selectedPropertyId);
                setProperty(found || null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al consultar propiedad:', error);
                setLoading(false);
            });
    }, [selectedPropertyId]);

    // Mostrar indicador de carga
    if (loading) {
        return <ActivityIndicator style={{ marginTop: 20 }} />;
    }

    // Si no se encuentra la propiedad
    if (!property) {
        return <Text style={styles.texto}>Propiedad no encontrada.</Text>;
    }

    // Calcular número de días
    const dias = range?.startDate && range?.endDate
        ? differenceInCalendarDays(range.endDate, range.startDate) + 1
        : 0;

    // Calcular el total a pagar
    const precioDia = property.price / 30;
    const total = precioDia * dias;

    return (
        <View style={styles.container}>
            <Text variant="titleMedium">Paso 3</Text>
            <Text style={styles.texto}>Resumen de tu reserva antes de pagar.</Text>

            <View style={styles.card}>
                <Text variant="titleSmall">{property.title}</Text>
                <Image
                    source={{ uri: property.image }}
                    style={styles.banner}
                    resizeMode="cover"
                />
                <Text>Dirección: {property.location}</Text>
                <Text>Ciudad: {property.city}</Text>
                <Text>Días de estancia: {dias} día(s)</Text>
                <Text>Precio por mes: ${formatCOP(property.price)} COP</Text>
                <Text>Precio por día: ${formatCOP(precioDia)} COP</Text>
                <Text style={styles.total}>Total: ${formatCOP(total)} COP</Text>
            </View>
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
    card: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
    },
    total: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1a1a1a',
    },
    banner: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginVertical: 10,
    },
});
