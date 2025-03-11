import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const Register = () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confermaPassword, setConfermaPassword] = useState('');
    const [regione, setRegione] = useState('');
    const [modelloMoto, setModelloMoto] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confermaPasswordError, setConfermaPasswordError] = useState(false);
    const [error, setError] = useState('');
    const [showPicker, setShowPicker] = useState(false); // Stato per mostrare/nascondere il Picker

    const regioniItaliane = [
        "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli Venezia Giulia",
        "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna",
        "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
    ];

    useEffect(() => {
        setPasswordError(password !== confermaPassword && confermaPassword !== '');
        setConfermaPasswordError(password !== confermaPassword && confermaPassword !== '');
    }, [password, confermaPassword]);

    const handleRegister = async () => {
    setError('');

    if (!nome || !cognome || !email || !password || !confermaPassword || !regione || !modelloMoto) {
        setError("Tutti i campi sono obbligatori.");
        return;
    }

    if (passwordError || confermaPasswordError) {
        setError("Le password non corrispondono.");
        return;
    }

    try {
        const response = await fetch('https://ikawalieridiakashi.it/api/registerUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                cognome,
                email,
                password,
                regione,
                modelloMoto
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Errore nella richiesta: ${response.status} - ${errorText || response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
            navigation.navigate('ThankYou');  // Naviga alla pagina ThankYou
        } else {
            setError(data.error || "Errore durante la registrazione. Riprova più tardi.");
        }
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        setError('Errore durante la registrazione: ' + error.message);
    }
};

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Registrazione</Text>
                {error ? (
                    <View style={styles.errorMessage}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="gray"
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cognome"
                    placeholderTextColor="gray"
                    onChangeText={setCognome}
                    value={cognome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="gray"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, passwordError ? styles.errorInput : null]}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <TextInput
                    style={[styles.input, confermaPasswordError ? styles.errorInput : null]}
                    placeholder="Conferma Password"
                    placeholderTextColor="gray"
                    onChangeText={setConfermaPassword}
                    value={confermaPassword}
                    secureTextEntry
                />

                {/* Input per la Regione con Modal */}
                <TouchableOpacity 
                    style={[styles.input, { justifyContent: 'center', alignItems: 'flex-start' }]} 
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={{ color: regione ? 'black' : 'gray' }}>
                        {regione ? regione : "Seleziona Regione"}
                    </Text>
                </TouchableOpacity>

                {/* Modal per selezionare la Regione */}
                <Modal 
                    transparent={true} 
                    visible={showPicker} 
                    animationType="fade"
                    onRequestClose={() => setShowPicker(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {regioniItaliane.map((regioneItem, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => { 
                                        setRegione(regioneItem); 
                                        setShowPicker(false); 
                                    }}
                                    style={styles.modalOption}
                                >
                                    <Text>{regioneItem}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>

                <TextInput
                    style={styles.input}
                    placeholder="Modello Moto"
                    placeholderTextColor="gray"
                    onChangeText={setModelloMoto}
                    value={modelloMoto}
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Registrati</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Hai già un account? Accedi</Text>
                </TouchableOpacity>
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
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        color: 'black',
    },
    errorInput: {
        borderColor: 'red',
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
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 30,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalOption: {
        paddingVertical: 10,
    },
});

export default Register;
