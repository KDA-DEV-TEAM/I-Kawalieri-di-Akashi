import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/spinner.svg')} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 50,
    height: 50,
  },
});

export default Loader;