import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Header from '../components/Header';  
import NavBar from '../components/NavBar';  
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Albo = () => {
  const [allUsers, setAllUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('https://ikawalieridiakashi.it/api/getUsers.php?page=1&limit=10000'); 
      const data = await response.json();
      if (Array.isArray(data.users)) { 
        setAllUsers(data.users); 
        setFilteredUsers(data.users); 
        setTotalPages(Math.ceil(data.users.length / 50)); 
      } else {
        throw new Error('La risposta API non contiene una lista di utenti valida.');
      }
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      const filtered = allUsers.filter(user =>
        user.cognome.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
      setTotalPages(Math.ceil(filtered.length / 50)); 
    } else {
      setFilteredUsers(allUsers); 
      setTotalPages(Math.ceil(allUsers.length / 50));
    }
  }, [searchQuery, allUsers]);

  useEffect(() => {
    fetchAllUsers();
  }, []); 

  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

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
      <View style={styles.headerhidden}>
        <Text style={styles.headerText}>Nome Completo</Text>
        <Text style={styles.headerTextDs}>Modello Moto</Text>
      </View>
    );
  };

  const paginateUsers = () => {
    const start = (currentPage - 1) * 50;
    const end = start + 50;
    return filteredUsers.slice(start, end);
  };

  return (
    <View style={styles.container}>
      <Header /> 
      
      <View style={styles.greenBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cerca per cognome" 
          placeholderTextColor="#d3d3d3" 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={() => {}}>
          <Icon name="search" size={24} color="white" /> 
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Nome Completo</Text>
        <Text style={styles.headerTextDs}>Modello Moto</Text>
      </View>

      {/* FlatList con header sotto la search bar */}
      <FlatList
        data={paginateUsers()}
        renderItem={renderUser}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}  
        ListHeaderComponent={renderHeader}  
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(1)} 
        >
          <Text style={styles.pageLink}>{"<< Inizio"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)} 
        >
          <Text style={styles.pageLink}>{"< Indietro"}</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {currentPage} di {totalPages}
        </Text>

        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)} 
        >
          <Text style={styles.pageLink}>{"Avanti >"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(totalPages)} 
        >
          <Text style={styles.pageLink}>{"Fine >>"}</Text>
        </TouchableOpacity>
      </View>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    color: '#fff',
  },
  greenBar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
  header: {
    flexDirection: 'row',
    backgroundColor: '#403f3f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  headerhidden: {
    display: 'none',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'left',
    color: '#fff',  
  },
  headerTextDs: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '50%',
    textAlign: 'right',
    color: '#fff',  
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#403f3f',
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    width: '50%',
    color: '#fff',
  },
  motoText: {
    fontSize: 16,
    textAlign: 'right', 
    width: '50%',
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: '#403f3f',
    paddingBottom: '12',
    paddingTop: '12',
  },
  pageButton: {
    marginHorizontal: 10,
  },
  pageLink: {
    fontSize: 16,
    color: 'yellow',
  },
  pageText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Albo;