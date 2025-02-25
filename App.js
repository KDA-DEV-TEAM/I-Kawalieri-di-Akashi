import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './screens/Index';
import Article from './screens/Article';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Gadget from './screens/Gadget';
import Albo from './screens/Albo';
import ThankYou from './screens/ThankYou';
import ResetPassword from './screens/ResetPassword';
import ModifyProfile from './screens/ModifyProfile';
import Contatti from './screens/Contatti';
import Staff from './screens/Staff';
import Regolamento from './screens/Regolamento';
import PrivacyCenter from './screens/PrivacyCenter';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false, // Nasconde l'header predefinito
          cardStyle: { backgroundColor: 'black' }, // Sfondo nero per tutte le schermate
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Gadget" component={Gadget} />
        <Stack.Screen name="Albo" component={Albo} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
        <Stack.Screen name="Contatti" component={Contatti} />
        <Stack.Screen name="Staff" component={Staff} />
        <Stack.Screen name="Regolamento" component={Regolamento} />
        <Stack.Screen name="PrivacyCenter" component={PrivacyCenter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
