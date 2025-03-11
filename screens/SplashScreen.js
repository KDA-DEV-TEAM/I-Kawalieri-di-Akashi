import React from 'react';
import { View, Image } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' }}>
      <Image
        source={require('../assets/splash-icon.png')}
        style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
      />
    </View>
  );
}