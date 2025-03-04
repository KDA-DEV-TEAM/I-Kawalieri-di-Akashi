import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import axios from 'axios';

const Contatti = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const data = { name, surname, email, phone, message };

    axios.post('https://ikawalieridiakashi.it/api/sendEmail.php', data)
      .then(response => {
        if (response.data.success) {
          Alert.alert('Successo', 'Email inviata con successo!');
        } else {
          Alert.alert('Errore', 'C\'è stato un errore nell\'invio dell\'email.');
        }
      })
      .catch(error => {
        Alert.alert('Errore', 'Impossibile inviare il messaggio.');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Contattaci</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Cognome"
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Messaggio"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <Button title="Invia" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20, 
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'black',
    backgroundColor: 'white',
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5, 
  },
  messageInput: {
    height: 200, 
    textAlignVertical: 'top', 
  },
});

export default Contatti;