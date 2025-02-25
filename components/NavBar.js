import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const NavBar = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuOffset = useSharedValue(-width); 

  const toggleMenu = () => {
    menuOffset.value = isMenuOpen ? -width : 0; 
    setMenuOpen(!isMenuOpen);
  };

  const menuAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(menuOffset.value, { damping: 15, stiffness: 120 }) }],
    };
  });

  return (
    <>
      {/* Navbar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Index')}>
          <FontAwesome name="home" size={20} color="white" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Albo')}>
          <FontAwesome name="book" size={20} color="white" />
          <Text style={styles.navText}>Albo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Gadget')}>
          <FontAwesome name="gift" size={20} color="white" />
          <Text style={styles.navText}>Gadget</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={toggleMenu}>
          <FontAwesome name="bars" size={20} color="white" />
          <Text style={styles.navText}>Altro</Text>
        </TouchableOpacity>
      </View>

      {/* Menu laterale */}
      <Animated.View style={[styles.menu, menuAnimation]}>
        <ScrollView style={styles.menuContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
            <FontAwesome name="user" size={20} color="white" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Staff')}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={styles.menuText}>Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contatti')}>
            <FontAwesome name="envelope" size={20} color="white" />
            <Text style={styles.menuText}>Contatti</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Regolamento')}>
            <FontAwesome name="book" size={20} color="white" />
            <Text style={styles.menuText}>Regolamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyCenter')}>
            <FontAwesome name="book" size={20} color="white" />
            <Text style={styles.menuText}>Privacy Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openLink('fb://group/ikawalieridiakashi')}>
            <FontAwesome name="facebook" size={20} color="white" />
            <Text style={styles.menuText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => openLink('instagram://user?username=ikawalieridiakashi')}>')}>
            <FontAwesome name="instagram" size={20} color="white" />
            <Text style={styles.menuText}>Instagram</Text>
          </TouchableOpacity>

          {/* Copyright */}>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>I Kawalieri di Akashi</Text>
            <Text style={styles.copyrightText}>All Right Reserved &copy; 2017-{new Date().getFullYear()}</Text>
          </View>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  navBar: {
    height: 70, 
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between', 
    backgroundColor: '#4CAF50', 
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5, 
  },
  navText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5, 
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: -15,
    width: width + 15, 
    height: height, 
    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
    zIndex: 1000,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 1100, // Assicurati che sia sopra il contenuto del menu
    backgroundColor: 'transparent',
    padding: 0,
  },
  closeText: {
    fontSize: 30,
    color: 'red', // Colore rosso per la "X"
    fontWeight: 'bold',
  },
  menuContent: {
    padding: 20,
    paddingLeft: 35,
    paddingTop: 60, 
    flexGrow: 1, 
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: 'white', 
  },
  copyright: {
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 20, 
  },
  copyrightText: {
    color: 'white',
    fontSize: 14,
  }  

});

export default NavBar;