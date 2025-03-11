import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { decodeHtmlEntities } from '../utils/htmlDecoder'; // Importa la funzione di decodifica

const Article = ({ route, navigation }) => {
  const { post } = route.params; // Ottieni l'articolo passato dalla navigazione

  // Funzione per estrarre le immagini dal contenuto HTML
  const extractImages = (html) => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    const images = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      images.push(match[1]); // Aggiungi l'URL dell'immagine all'array
    }
    return images;
  };

  // Estrai le immagini dal contenuto dell'articolo
  const images = extractImages(post.content.rendered);

  // Rimuovi i tag HTML dal contenuto e decodifica i caratteri HTML
  const cleanContent = decodeHtmlEntities(post.content.rendered.replace(/<[^>]+>/g, ''));

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Contenuto dell'articolo */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.articleBox}>
          {/* Titolo dell'articolo (decodificato) */}
          <Text style={styles.title}>{decodeHtmlEntities(post.title.rendered)}</Text>

          {/* Immagini estratte dal contenuto */}
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.image}
            />
          ))}

          {/* Contenuto dell'articolo (senza tag HTML e decodificato) */}
          <Text style={styles.content}>{cleanContent}</Text>

          {/* Pulsante "Torna agli articoli" */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()} // Torna alla schermata precedente
          >
            <Text style={styles.buttonText}>Torna agli articoli</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* NavBar */}
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
    flexGrow: 1,
    paddingBottom: 60, // Spazio per la navbar
  },
  articleBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, // Migliora la leggibilità del testo
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 5, // Angoli arrotondati di 5px
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Article;