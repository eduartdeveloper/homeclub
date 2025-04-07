import React, { useState, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Text,
    ImageBackground,
    ListRenderItem
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '@/components/BackButton';

type Message = {
    id: string;
    text: string;
    from: 'user' | 'agent';
};

export default function ChatScreen() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hola 👋 ¿Qué dudas tienes sobre la propiedad?', from: 'agent' },
    ]);
    const [input, setInput] = useState('');

    // enviar mensaje
    const handleSend = useCallback(() => {
        if (input.trim() === '') return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            from: 'user',
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
    }, [input]);

    // renderizar cada mensaje
    const renderMessage: ListRenderItem<Message> = ({ item }) => (
        <View
            style={[
                styles.messageBubble,
                item.from === 'user' ? styles.userBubble : styles.agentBubble,
            ]}
        >
            <Text
                style={[
                    styles.messageText,
                    item.from === 'user' ? styles.userBubbleText : styles.agentBubbleText,
                ]}
            >
                {item.text}
            </Text>
        </View>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/back-splash.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <BackButton />

            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={90}
                >
                    <FlatList
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.chatContent}
                    />
                </KeyboardAvoidingView>
            </View>

            {/* Input de texto y botón de envío */}
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
    },
    chatContent: {
        padding: 16,
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 100,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 16,
        marginVertical: 5,
    },
    userBubble: {
        backgroundColor: '#000',
        alignSelf: 'flex-end',
    },
    agentBubble: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    userBubbleText: {
        color: '#fff',
    },
    agentBubbleText: {
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
        left: 0,
        right: 0,
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
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 20,
    },
});
