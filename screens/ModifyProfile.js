import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';

const ModifyProfile = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.text}>Modify Your Profile Here.</Text>
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
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default ModifyProfile;