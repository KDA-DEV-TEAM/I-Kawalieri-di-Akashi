import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('user_id');
      setIsLoggedIn(!!userId); 
    };

    checkLoginStatus();
  }, []);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} 
          style={styles.logo}
          resizeMode="contain" 
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>I Kawalieri di Akashi</Text>
        </View>

        <View style={styles.rightContainer}>
          {isLoggedIn ? (
            <TouchableOpacity onPress={handleProfilePress}>
              <Image
                source={require('../assets/snack-icon.png')} 
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={styles.loginButton}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#252525',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
    opacity: 1,
  },
  header: {
    height: 90, 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    justifyContent: 'space-between', 
    backgroundColor: '#252525',
    padding: 10,
    paddingBottom: 15, 
    opacity: 1,
  },
  logo: {
    width: 40, 
    height: 40, 
  },
  titleContainer: {
    flex: 1, 
    alignItems: 'center', 
    marginLeft: -10, 
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  loginButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;