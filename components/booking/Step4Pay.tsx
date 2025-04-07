import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Animated,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    Image,
    ScrollView,
} from 'react-native';

interface CardForm {
    cardNumber: string;
    cardName: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
}


interface Step4Props {
    form: CardForm;
    setForm: (form: CardForm) => void;
}

export default function Step4({ form, setForm }: Step4Props) {
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const animatedValue = useRef(new Animated.Value(0)).current;

    // Animación al reverso
    const flipToBack = () => {
        Animated.timing(animatedValue, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsCardFlipped(true));
    };

    // Animación al frente
    const flipToFront = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsCardFlipped(false));
    };

    // Interpolación de rotación para el frente
    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    // Interpolación de rotación para el reverso
    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Tarjeta de creditoo */}
                <View style={styles.cardWrapper}>
                    <Animated.View
                        style={[
                            styles.cardFace,
                            styles.cardFront,
                            { transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }] },
                        ]}
                    >
                        <ImageBackground
                            source={require('../../assets/images/backgroundCard.jpeg')}
                            resizeMode="cover"
                            style={styles.cardBackground}
                            imageStyle={{ borderRadius: 16 }}
                        >
                            <View style={styles.headerRow}>
                                <Image source={require('../../assets/images/chip.png')} style={styles.chip} resizeMode="contain" />
                                <Image source={require('../../assets/images/visa.png')} style={styles.visa} resizeMode="contain" />
                            </View>

                            <Text style={styles.cardNumber}>{form.cardNumber || '#### #### #### ####'}</Text>

                            <View style={styles.cardFooter}>
                                <View>
                                    <Text style={styles.label}>Titular</Text>
                                    <Text style={styles.cardText}>{form.cardName || 'NOMBRE COMPLETO'}</Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>Expira</Text>
                                    <Text style={styles.cardText}>
                                        {(form.cardMonth || 'MM')}/{(form.cardYear || 'YY')}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.cardFace,
                            styles.cardBack,
                            { transform: [{ perspective: 1000 }, { rotateY: backInterpolate }] },
                        ]}
                    >
                        <ImageBackground
                            source={require('../../assets/images/backgroundCard.jpeg')}
                            resizeMode="cover"
                            style={styles.cardBackground}
                            imageStyle={{ borderRadius: 16 }}
                        >
                            <View style={styles.blackBar} />
                            <Image source={require('../../assets/images/visa.png')} style={styles.visaBack} resizeMode="contain" />

                            <View style={styles.cvvContainer}>
                                <Text style={styles.label}>CVC</Text>
                                <View style={styles.cvvBox}>
                                    <Text style={styles.cvvText}>{form.cardCvv || '***'}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>
                </View>

                {/* Formulario de tarjeta */}
                <ScrollView style={{ paddingHorizontal: 16 }}>
                    {/* Número de tarjeta */}
                    <TextInput
                        style={styles.input}
                        placeholder="Número de tarjeta"
                        keyboardType="number-pad"
                        maxLength={19}
                        value={form.cardNumber}
                        onChangeText={(text) => {
                            const cleaned = text.replace(/\D/g, '').slice(0, 16);
                            const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
                            setForm({ ...form, cardNumber: formatted });
                        }}
                    />

                    {/* Titular */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del titular"
                        maxLength={19}
                        value={form.cardName}
                        onChangeText={(text) => setForm({ ...form, cardName: text })}
                    />

                    {/* Fecha de expiración */}
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="MM"
                            keyboardType="numeric"
                            maxLength={2}
                            value={form.cardMonth}
                            onChangeText={(text) => setForm({ ...form, cardMonth: text })}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="YY"
                            keyboardType="numeric"
                            maxLength={2}
                            value={form.cardYear}
                            onChangeText={(text) => setForm({ ...form, cardYear: text })}
                        />
                    </View>

                    {/* Código de seguridad */}
                    <TextInput
                        style={styles.input}
                        placeholder="CVC"
                        keyboardType="numeric"
                        maxLength={4}
                        value={form.cardCvv}
                        onChangeText={(text) => setForm({ ...form, cardCvv: text })}
                        onFocus={flipToBack}
                        onBlur={flipToFront}
                    />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    cardWrapper: {
        width: '100%',
        height: 190,
        marginBottom: 24,
        position: 'relative',
    },
    cardFace: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        backfaceVisibility: 'hidden',
    },
    cardFront: {
        zIndex: 2,
    },
    cardBack: {
        zIndex: 1,
    },
    cardBackground: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chip: {
        width: 50,
        height: 40,
        borderRadius: 8,
    },
    visa: {
        width: 70,
        height: 40,
        borderRadius: 8,
    },
    visaBack: {
        width: 70,
        height: 40,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 18,
        letterSpacing: 2,
        marginTop: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 10,
        color: '#ccc',
        textTransform: 'uppercase',
    },
    cardText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    blackBar: {
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginTop: 20,
    },
    cvvContainer: {
        marginTop: 30,
    },
    cvvBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 6,
        marginTop: 5,
        width: 80,
    },
    cvvText: {
        fontSize: 16,
        letterSpacing: 2,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
});
