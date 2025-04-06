import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hola 👋 ¿Qué dudas tienes sobre la propiedad?', from: 'agent' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessage = {
            id: Date.now().toString(),
            text: input,
            from: 'user'
        };
        setMessages([...messages, newMessage]);
        setInput('');
    };

    const renderMessage = ({ item }) => (
        <View style={[styles.messageBubble, item.from === 'user' ? styles.userBubble : styles.agentBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/back-splash.png')} // Asegúrate de que la ruta es correcta
            style={styles.background}
            resizeMode="cover"
        >
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={90}
                >
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{ padding: 16 }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ padding: 16, flexGrow: 1, justifyContent: 'flex-end' }}
                    />


                </KeyboardAvoidingView>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un mensaje..."
                    placeholderTextColor="#999"
                    value={input}
                    onChangeText={setInput}
                    multiline
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <MaterialCommunityIcons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        alignContent: 'flex-end'
        // paddingTop: 50,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 16,
        marginVertical: 5,
    },
    userBubble: {
        backgroundColor: 'rgba(98, 0, 238, 0.8)',
        alignSelf: 'flex-end',
    },
    agentBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignSelf: 'flex-start',
    },
    messageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        maxHeight: 100,
        color: '#000',
    },
    sendButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 20,
    }
});
