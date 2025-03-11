import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content" 
      />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#252525',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
  headerContainer: {
    backgroundColor: '#252525',
    opacity: 1,
  },
  header: {
    height: Platform.OS === 'ios' ? 110 : 60, 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    justifyContent: 'space-between', 
    backgroundColor: '#252525',
    padding: 10,
    paddingBottom: 15, 
    opacity: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: -20,
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
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
