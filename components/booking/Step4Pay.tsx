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
    ScrollView
} from 'react-native';

export default function Step4() {
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const animatedValue = useRef(new Animated.Value(0)).current;

    const flipToBack = () => {
        Animated.timing(animatedValue, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsCardFlipped(true));
    };

    const flipToFront = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsCardFlipped(false));
    };

    const frontInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>

                <View style={styles.cardWrapper}>
                    {/* Parte frontal */}
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/chip.png')} style={styles.chip} resizeMode='contain' />
                                <Image source={require('../../assets/images/visa.png')} style={styles.visa} resizeMode='contain' />
                            </View>

                            <Text style={styles.cardNumber}>
                                {cardNumber || '#### #### #### ####'}
                            </Text>
                            <View style={styles.cardFooter}>
                                <View>
                                    <Text style={styles.label}>Titular</Text>
                                    <Text style={styles.cardText}>
                                        {cardName || 'NOMBRE COMPLETO'}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.label}>Expira</Text>
                                    <Text style={styles.cardText}>
                                        {(cardMonth || 'MM')}/{(cardYear || 'YY')}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>

                    {/* Parte trasera */}
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
                            <Image source={require('../../assets/images/visa.png')} style={styles.visaBack} resizeMode='contain' />
                            <View style={styles.cvvContainer}>
                                <Text style={styles.label}>CVC</Text>
                                <View style={styles.cvvBox}>
                                    <Text style={styles.cvvText}>{cardCvv || '***'}</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>
                </View>

                {/* Formulario */}
                <ScrollView style={{paddingHorizontal: 16}} >

                    <TextInput
                        style={styles.input}
                        placeholder="Número de tarjeta"
                        keyboardType="number-pad"
                        maxLength={19}
                        value={cardNumber}
                        onChangeText={(text) => {
                            // Elimina todo lo que no sea número
                            const cleaned = text.replace(/\D/g, '').slice(0, 16);

                            // Agrupa en bloques de 4
                            const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();

                            setCardNumber(formatted);
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del titular"
                        maxLength={19}
                        value={cardName}
                        onChangeText={setCardName}
                    />
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="MM"
                            keyboardType="numeric"
                            maxLength={2}
                            value={cardMonth}
                            onChangeText={setCardMonth}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="YY"
                            keyboardType="numeric"
                            maxLength={2}
                            value={cardYear}
                            onChangeText={setCardYear}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="CVC"
                        keyboardType="numeric"
                        maxLength={4}
                        value={cardCvv}
                        onChangeText={setCardCvv}
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
        padding: 0,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
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
    chip: {
        width: 50,
        height: 40,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    visa: {
        width: 70,
        height: 40,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    visaBack: {
        width: 70,
        height: 40,
        borderRadius: 8,
        position: 'absolute',
        bottom: 16,
        right: 16
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
