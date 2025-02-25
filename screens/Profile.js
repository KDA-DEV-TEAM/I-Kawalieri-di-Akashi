import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ route }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { user_id } = route.params || {}; // Recupera user_id dalla navigazione (se passato)

  // Usa useCallback per memorizzare la funzione e evitare ricreazioni inutili
  const fetchUserData = useCallback(async () => {
    try {
      const storedUserId = user_id || await AsyncStorage.getItem('user_id');
      if (!storedUserId) {
        console.error('ID utente non trovato');
        return;
      }

      const response = await fetch(`https://ikawalieridiakashi.it/api/getUser.php?id=${storedUserId}`);
      const data = await response.json();

      if (data.error) {
        console.error('Errore:', data.error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
    } finally {
      setLoading(false);
    }
  }, [user_id]); // Dipendenza dalla variabile user_id

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Usa la funzione come dipendenza

  // Funzione per fare il logout dell'utente
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Rimuovi il token utente
      await AsyncStorage.removeItem('user_id'); // Rimuovi l'ID utente (se necessario)
      navigation.navigate('Login'); // Naviga alla schermata di login
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <Text>Caricamento...</Text>
        <NavBar />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Header />
        <Text>Utente non trovato</Text>
        <NavBar />
      </View>
    );
  }

  const kdaNumber = `KDA ${String(user.id).padStart(6, '0')}`;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Avatar e informazioni utente */}
        <Image
          source={{ uri: `https://www.ikawalieridiakashi.it/ikawalieridiakashi/app/${user.avatar}` }}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Ciao,</Text>
        <Text style={styles.name}>{user.nome} {user.cognome}</Text>
        <Text style={styles.detail}>Email: {user.email}</Text>
        <Text style={styles.detail}>La tua tessera</Text>

        {/* Carta di identità */}
        <ImageBackground
          source={require('../assets/card-kda.jpg')}
          style={styles.card}
          imageStyle={styles.cardBackground}
        >
          <View style={styles.cardHeader}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>I Kawalieri di Akashi</Text>
              <Text style={styles.cardText}>{user.nome} {user.cognome}</Text>
              <Text style={styles.detail}>Regione: {user.regione}</Text>
              <Text style={styles.cardText}>Moto: {user.modello_moto}</Text>
            </View>
          </View>

          {/* Footer della carta */}
          <View style={styles.cardFooter}>
            <Text style={styles.kdaNumber}>Tessera nr. {kdaNumber}</Text>
            <Text style={styles.cardFooterText}>Associazione Culturale Sportiva I Kawalieri di Akashi</Text>
          </View>
        </ImageBackground>

        {/* Pulsante per modificare dati */}
        <TouchableOpacity
          style={styles.modifyButton}
          onPress={() => navigation.navigate('ModifyProfile')}
        >
          <Text style={styles.modifyButtonText}>Modifica dati tessera</Text>
        </TouchableOpacity>

        {/* Link Logout sotto il pulsante Modifica tessera */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    padding: 0,
    alignItems: 'center',
    paddingBottom: 60, // Spazio per la navbar
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 15,
  },
  greeting: {
    fontSize: 24,
    color: 'white',
    marginTop: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  detail: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'transparent', // La background viene gestita da ImageBackground
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    minWidth: '90%',
  },
  cardBackground: {
    borderRadius: 10,
    resizeMode: 'cover', // L'immagine copre tutta la card
    justifyContent: 'flex-start', // Mantiene il contenuto in cima
    alignSelf: 'flex-end', // Allinea l'immagine di sfondo a destra
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 120,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
    marginLeft: 8,
  },
  cardTitle: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  kdaNumber: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  cardFooter: {
    marginTop: 15,
    alignItems: 'left',
  },
  cardFooterText: {
    fontSize: 12,
    color: 'white',
    marginTop: 5,
  },
  modifyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 40,
    width: '85%',
    alignItems: 'center',
  },
  modifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;

