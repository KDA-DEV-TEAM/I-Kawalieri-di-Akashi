import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const ThankYou = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <Text style={styles.title}>Grazie per esserti registrato!</Text>
                <Text style={styles.message}>La tua registrazione è andata a buon fine. Ora puoi accedere al tuo account.</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}  // Naviga alla pagina di login
                >
                    <Text style={styles.buttonText}>Vai alla Login</Text>
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
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ThankYou;