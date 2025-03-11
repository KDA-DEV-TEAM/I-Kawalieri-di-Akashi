import React, { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    const handleResetPassword = async () => {
        setMessage('');
        
        if (!email) {
            setMessage('Inserisci la tua email.');
            return;
        }
        
        try {
            const response = await fetch('https://ikawalieridiakashi.it/api/ResetPassword.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            setMessage(data.message || 'Controlla la tua email per la nuova password.');
        } catch (error) {
            setMessage('Errore nel reset della password. Riprova più tardi.');
        }
    };

    return (
        <View style={styles.container}>
          <Header />
            <View style={styles.content}>
              <Text style={styles.title}>Reset Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Inserisci la tua email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
              />
              <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Invia nuova password</Text>
              </TouchableOpacity>
              {message ? <Text style={styles.message}>{message}</Text> : null}
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backLink}>Torna indietro</Text>
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
  },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        color: 'black',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    message: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
    backLink: {
        color: '#007BFF',
        marginTop: 20,
    },
});

export default ResetPassword;