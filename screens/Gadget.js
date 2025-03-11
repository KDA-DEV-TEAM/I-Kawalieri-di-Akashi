import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const Gadget = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* WebView per l'iframe con margini laterali */}
      <WebView
        source={{ uri: 'https://ikawalieridiakashi.it/pwa/gadget-mobile/' }}
        style={styles.webview}
      />

      {/* NavBar */}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  webview: {
    width: '95%',  // Imposta la larghezza al 100%
    marginHorizontal: 10,  // Aggiungi margini orizzontali di 10px a sinistra e a destra
    flex: 1,  // Occupa tutto lo spazio rimanente
  },
});

export default Gadget;
