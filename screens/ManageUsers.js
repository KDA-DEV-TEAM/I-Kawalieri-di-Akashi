import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageUser = () => { // Nome della componente cambiato in ManageUser
    const [password, setPassword] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(true);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    // Funzione per gestire l'invio della password
    const handlePasswordSubmit = () => {
        if (password === 'KawalieriAdmin') {
            setShowPasswordInput(false); // Nasconde l'input della password se è corretta
        } else {
            Alert.alert('Errore', 'Password errata.'); // Mostra un alert se la password è sbagliata
        }
    };

    // Se l'input della password è visibile, mostra solo il form della password
    if (showPasswordInput) {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Inserisci la password"
                    placeholderTextColor="gray"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
                    <Text style={styles.buttonText}>Accedi</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Controllo dell'ID utente (solo se la password è corretta)
    useEffect(() => {
        const checkUserAuthorization = async () => {
            try {
                // Recupera l'ID utente da AsyncStorage (o da un contesto di autenticazione)
                const userId = await AsyncStorage.getItem('userId');
                if (userId !== '1' && userId !== '3') {
                    navigation.navigate('Login'); // Reindirizza alla pagina di login se l'utente non è autorizzato
                } else {
                    fetchUsers(page); // Carica gli utenti se l'utente è autorizzato
                }
            } catch (error) {
                console.error("Errore durante il recupero dell'ID utente:", error);
                navigation.navigate('Login'); // Reindirizza alla pagina di login in caso di errore
            }
        };

        checkUserAuthorization();
    }, [page, navigation]);

    // Funzione per caricare gli utenti
    const fetchUsers = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`https://ikawalieridiakashi.it/api/getUsers.php?page=${page}`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error("Errore durante il fetch degli utenti:", error);
        } finally {
            setLoading(false);
        }
    };

    // Funzione per approvare/respingere un utente
    const handleApprove = async (userId, action) => {
        try {
            const response = await fetch('https://ikawalieridiakashi.it/api/approveUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, action }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('Successo', `Utente ${action === 'approve' ? 'approvato' : 'respinto'} con successo.`);
                fetchUsers(page); // Ricarica la lista degli utenti
            } else {
                Alert.alert('Errore', data.error || 'Errore durante l\'operazione.');
            }
        } catch (error) {
            console.error("Errore durante l'approvazione/respingimento:", error);
            Alert.alert('Errore', 'Errore durante l\'operazione.');
        }
    };

    // Renderizzazione di ogni utente
    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userText}>{item.nome} {item.cognome}</Text>
            <Text style={styles.userText}>{new Date(item.data_registrazione).toLocaleDateString()}</Text>
            <View style={styles.actions}>
                <TouchableOpacity 
                    style={[styles.button, styles.approveButton]} 
                    onPress={() => handleApprove(item.id, 'approve')}
                >
                    <Text style={styles.buttonText}>Approva</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.button, styles.rejectButton]} 
                    onPress={() => handleApprove(item.id, 'reject')}
                >
                    <Text style={styles.buttonText}>Respingi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={() => setPage(prevPage => prevPage + 1)}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <Text style={styles.loadingText}>Caricamento...</Text> : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
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
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userText: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
    },
    rejectButton: {
        backgroundColor: '#f44336',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 10,
    },
});

export default ManageUser; // Export della componente con il nuovo nome