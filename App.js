//navigation import 
import { NavigationContainer } from '@react-navigation/native'; //manager of navigation , without it React Navigation doesn't work 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import FormScreen from './components/FormScreen';
import PassScreen from './components/PassScreen';
import OptionsScreen from './components/OptionsScreen';
import AdminDashboardScreen from './components/AdminDashboardScreen';

//declare the stack navigator 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OptionsScreen" component={OptionsScreen} options={{ headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormScreen" component={FormScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PassScreen" component={PassScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


