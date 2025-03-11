import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import { decodeHtmlEntities } from '../utils/htmlDecoder'; 
import * as ScreenOrientation from 'expo-screen-orientation';

async function lockOrientation() {
  await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

lockOrientation();

const Index = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // Flag per il caricamento successivo
  const [page, setPage] = useState(1); // Pagina per la paginazione

  const loadPosts = useCallback(async (pageNumber) => {
    try {
      setLoadingMore(true);
      const response = await fetch(`https://ikawalieridiakashi.it/wp-json/wp/v2/posts?_embed&page=${pageNumber}`);
      const data = await response.json();

      // Verifica che `data` sia un array
      if (Array.isArray(data)) {
        setPosts((prevPosts) => [...prevPosts, ...data]); // Aggiungi i nuovi articoli alla lista esistente
      } else {
        console.error('La risposta dell\'API non è un array:', data);
      }
    } catch (error) {
      console.error('Errore nel caricamento degli articoli:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(page); // Carica gli articoli della pagina iniziale
  }, [page, loadPosts]);

  const loadMorePosts = () => {
    if (!loadingMore) {
      setPage((prevPage) => prevPage + 1); // Passa alla pagina successiva
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => navigation.navigate('Article', { post: item })}
    >
      <Image
        source={{ uri: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/200' }}
        style={styles.postImage}
      />
      <Text style={styles.postTitle}>{decodeHtmlEntities(item.title.rendered)}</Text>
      <Text style={styles.readMore}>Leggi di più</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMorePosts} // Funzione chiamata quando si arriva al fondo
          onEndReachedThreshold={0.1} // Triggera il caricamento un po' prima di raggiungere il fondo
          ListFooterComponent={loadingMore ? <Loader /> : null} // Mostra un loader quando si caricano altri articoli
        />
      )}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  readMore: {
    color: '#4CAF50',
    fontSize: 16,
    marginTop: 10,
  },
});

export default Index;