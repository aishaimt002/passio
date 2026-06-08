import { Text, View } from 'react-native';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import OptionsScreen from './OptionsScreen';


export default function SplashScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/my-images/logo.png')} />
                <Text style={styles.title}>CheckIn</Text>
                <Text style={styles.subtitle}>Digital Entry Pass System</Text>
                <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('OptionsScreen')}>
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.version}>Secure Verification v2.4</Text>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 8
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 150
  },
  title: {
    color: '#47a5fb',
    fontSize: 16,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#666976',
    fontWeight: '300',
    fontSize: 14
  },
  version: {
    fontSize: '12',
    fontWeight: '300',
    color: '#666976',
    position: 'absolute',
    top: 670
  },
  primaryBtn: {
    backgroundColor: '#4aa9fb',
    width: 280,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }

});