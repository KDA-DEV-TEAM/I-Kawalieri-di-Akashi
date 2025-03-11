import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Index from './screens/Index';
import Article from './screens/Article';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Gadget from './screens/Gadget';
import Albo from './screens/Albo';
import Regolamento from './screens/Regolamento';
import Privacy from './screens/Privacy';
import Contatti from './screens/Contatti';
import ThankYou from './screens/ThankYou';
import ResetPassword from './screens/ResetPassword';
import SplashScreenComponent from './screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Add any initialization logic here
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="black" />
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
        <Stack.Screen name="Regolamento" component={Regolamento} />
        <Stack.Screen name="Contatti" component={Contatti} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
