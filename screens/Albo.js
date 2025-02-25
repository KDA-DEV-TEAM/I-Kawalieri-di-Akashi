import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Header from '../components/Header';  // Assicurati di avere il tuo componente Header
import NavBar from '../components/NavBar';  // Assicurati di avere il tuo componente NavBar

const UserList = () => {
  const [allUsers, setAllUsers] = useState([]); // Contiene tutti gli utenti
  const [filteredUsers, setFilteredUsers] = useState([]); // Gli utenti filtrati dalla ricerca
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // Stato per la query di ricerca

  // Funzione per caricare tutti gli utenti
  const fetchAllUsers = async () => {
    try {
      const response = await fetch('https://ikawalieridiakashi.it/api/getUsers.php?page=1&limit=1000'); // Carica un numero sufficiente di utenti, ad esempio 1000
      const data = await response.json();
      setAllUsers(data.users); // Salva tutti gli utenti
      setFilteredUsers(data.users); // Imposta anche i risultati filtrati iniziali
      setTotalPages(Math.ceil(data.users.length / 50)); // Imposta il numero di pagine
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
    }
  };

  // Filtra gli utenti quando cambia la query di ricerca
  useEffect(() => {
    if (searchQuery) {
      const filtered = allUsers.filter(user =>
        user.cognome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
      setTotalPages(Math.ceil(filtered.length / 50)); // Ricalcola il numero di pagine in base ai risultati filtrati
    } else {
      setFilteredUsers(allUsers); // Mostra tutti gli utenti se non c'è ricerca
      setTotalPages(Math.ceil(allUsers.length / 50)); // Ricalcola il numero di pagine per tutti gli utenti
    }
  }, [searchQuery, allUsers]);

  useEffect(() => {
    fetchAllUsers();
  }, []); // Carica gli utenti una sola volta al primo rendering

  // Funzione per capitalizzare il nome e cognome
  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Funzione per fare il modello della moto tutto maiuscolo
  const formatMoto = (moto) => {
    return moto.toUpperCase();
  };

  const renderUser = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{capitalizeName(item.nome)} {capitalizeName(item.cognome)}</Text>
        <Text style={styles.motoText}>{formatMoto(item.modello_moto)}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Nome Completo</Text>
        <Text style={styles.headerText}>Modello Moto</Text>
      </View>
    );
  };

  const paginateUsers = () => {
    const start = (currentPage - 1) * 50;
    const end = start + 50;
    return filteredUsers.slice(start, end); // Mostra solo i 50 utenti per la pagina corrente
  };

  return (
    <View style={styles.container}>
      <Header /> {/* Mantieni l'header */}
      
      {/* Barra verde con lente di ricerca */}
      <View style={styles.greenBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cerca per cognome" // Testo predefinito
          placeholderTextColor="#d3d3d3" // Colore grigio chiaro per il testo del placeholder
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.searchIcon}>🔍</Text> {/* Lente di ricerca */}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.table}>
        {renderHeader()} {/* Intestazione della tabella */}
        <FlatList
          data={paginateUsers()} // Mostra solo i 50 utenti per la pagina corrente
          renderItem={renderUser}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* Paginazione */}
        <View style={styles.pagination}>
          <TouchableOpacity
            style={styles.pageButton}
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(1)} // Vai alla prima pagina
          >
            <Text style={styles.pageLink}>{"<< Inizio"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pageButton}
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)} // Vai alla pagina precedente
          >
            <Text style={styles.pageLink}>{"< Indietro"}</Text>
          </TouchableOpacity>

          <Text style={styles.pageText}>
            {currentPage} di {totalPages}
          </Text>

          <TouchableOpacity
            style={styles.pageButton}
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)} // Vai alla pagina successiva
          >
            <Text style={styles.pageLink}>{"Avanti >"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pageButton}
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(totalPages)} // Vai all'ultima pagina
          >
            <Text style={styles.pageLink}>{"Fine >>"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavBar /> {/* Mantieni la navbar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greenBar: {
    backgroundColor: 'green',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  searchIcon: {
    fontSize: 24,
    color: 'white',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingLeft: 10,
    width: '90%',
    backgroundColor: '#fff',
    color: 'black',
  },
  table: {
    paddingBottom: 20, // Aggiungi un po' di padding in basso per evitare sovrapposizioni con la navbar
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'center',  // Centra il testo nell'intestazione
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    width: '50%',
  },
  motoText: {
    fontSize: 16,
    textAlign: 'right', // Allinea il testo della colonna "Modello Moto" a destra
    width: '50%',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 10,
  },
  pageLink: {
    fontSize: 16,
    color: '#007bff',
  },
  pageText: {
    fontSize: 18,
    color: '#333',
  },
});

export default UserList;

