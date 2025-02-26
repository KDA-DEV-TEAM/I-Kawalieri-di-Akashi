import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
    setError(''); // Reset error message

    if (!email || !password) {
        setError("Email e password sono obbligatori.");
        return;
    }

    try {
        console.log("Tentativo di login con email:", email);
        const response = await fetch('https://ikawalieridiakashi.it/api/loginUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Log della risposta completa
        const responseText = await response.text();
        console.log("Risposta completa dal server:", responseText);  // Log completo della risposta

        if (!response.ok) {
            console.error("Errore HTTP:", response.status, responseText);
            setError(`Errore nella richiesta: ${response.status} - ${responseText}`);
            return;
        }

        // Parsing del JSON
        const data = JSON.parse(responseText);
        console.log("Dati ricevuti dal server:", data);

        if (data.token && data.user_id) {
            console.log("Token e user_id ricevuti:", data.token, data.user_id);
            await AsyncStorage.setItem('auth_token', data.token);
            await AsyncStorage.setItem('user_id', String(data.user_id));
            navigation.navigate('Profile', { user_id: data.user_id });
        } else if (data.error) {
            setError(data.error);
        } else {
            setError("Errore durante il login. Riprova più tardi.");
        }

    } catch (error) {
        console.error("Errore durante la richiesta:", error);
        setError('Errore durante la connessione: ' + error.message);
    }
};

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                {error ? (
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.forgotPassword}>Password dimenticata?</Text>
                </TouchableOpacity>
            </View>
            <NavBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: '#333',
        color: 'white',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    loginButton: {
        width: '100%',
        height: 45,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 15,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPassword: {
        color: '#007BFF',
        fontSize: 14,
    },
    errorMessage: {
        backgroundColor: '#FFDDDD',
        borderWidth: 1,
        borderColor: '#FF0000',
        padding: 10,
        marginBottom: 15,
        width: '100%',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Login;
