import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OptionsScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.parentContainer}>
            <View style={styles.childContainer}>
                <Image style={styles.logo} source={require('../assets/my-images/logo.png')} />
                <Text style={styles.title}>CheckIn</Text>
            </View>
            <View style={styles.subchildContainer}>
                <Text style={styles.Heading}>Digital visitor passes,instantly.</Text>
                <Text style={styles.subheading}>Scan the QR code to fill out a quick form. Once approved, your digital pass is ready.</Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('HomeScreen')}>
                   <View style={styles.imgcontainer}>
                     <Image source={require('../assets/my-images/scanncode.png')} style={styles.myicon} />
                   </View>
                    <View style={styles.getpass}>
                        <Text style={styles.createpass}>Create Pass</Text>
                        <Text style={styles.bodytext}>Create a new digital visitor pass</Text>
                    </View>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('AdminDashboardScreen')}>
                   <View style={styles.imgcontainer}>
                     <Image source={require('../assets/my-images/dashboard.png')} style={styles.myicon} />
                   </View>
                    <View style={styles.getpass}>
                        <Text style={styles.createpass}>Admin</Text>
                        <Text style={styles.bodytext}>Manage and review the visitor pass</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    childContainer: {
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        left: 160,
        right: 150,
    },
    logo: {
        width: 70,
        height: 70
    },
    title: {
        justifyContent: 'center',
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    subchildContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: 335,
        marginLeft: 30,
        marginTop: 70,
        gap: 12
    },
    Heading: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subheading: {
        textAlign: 'center',
        color: '#4b4b4bff'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        gap: 25
    },
    container: {
        flexDirection: 'row',
        gap: 10,
        width: 290,
        height: 60,
        borderRadius: 8,
        borderColor: '#bdbdbdff',
        borderWidth: 1,
        padding: 10,
        gap: 8
        
    },
    imgcontainer:{
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#d8d8d8ff',
        padding: 6
    },
    myicon:{
       width: 30
    },
    createpass:{
        fontSize: 14,
        fontWeight: 'bold'
    },
    bodytext:{
        fontSize: 12,
        color: 'gray'
    },
    getpass:{
        gap: 4
    }


})