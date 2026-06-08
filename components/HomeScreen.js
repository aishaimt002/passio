import { Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CameraView } from 'expo-camera';
import { useState } from 'react';
import { useCameraPermissions } from 'expo-image-picker';

export default function HomeScreen() {
    const navigation = useNavigation();

    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if(!permission){
        return<Text>Requesting Permission</Text>
    }

    if(!permission.granted){
        return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{ marginBottom: 20 }}>
                Camera permission required
            </Text>

            <TouchableOpacity
                onPress={requestPermission}
                style={{
                    backgroundColor: 'black',
                    padding: 12,
                    borderRadius: 10
                }}
            >
                <Text style={{ color: 'white' }}>
                    Tap to allow camera
                </Text>
            </TouchableOpacity>
        </View>
    );
    }

    return (
        <View style={styles.parentContainer}>
            <View style={styles.mainHeader}>
                <View style={styles.leftHeader}>
                    <Text style={styles.text}>CheckIn</Text>
                </View>
                <View style={styles.rightHeader}>
                    <Image style={styles.adminIcon} source={require('../assets/my-images/icon.png')} />
                    <Text style={styles.adminText}>Admin</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Scan to request your <Text style={{ color: '#4aa7fc' }}>digital pass</Text></Text>
                <Text style={styles.bodyText}>Point your phone camera at the code below. Fill out a short form and your entry pass arrives on your email.</Text>
            </View>
            <View style={styles.QRcode}>
                   <CameraView 
                    style={styles.logo} 
                    barcodeScannerSettings={{
                        barcodeTypes:['qr']
                    }}
                    onBarcodeScanned={({ data}) => {
                        if(!scanned){
                            setScanned(true);
                            Linking.openURL(data);
                        }
                    }}
                    />
                <Image style={styles.qr} source={require('../assets/my-images/my-qrcode.png')} />
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('FormScreen')}>
                <Text style={styles.btnText}>Continue on this device</Text>
            </TouchableOpacity>
            <Text style={styles.txt}>Powered by CheckIn - Secure Vistor Management</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#f3f7fc'
    },
    mainHeader: {
        flexDirection: 'row',
        gap: 170,
        marginTop: 60,
        marginLeft: 50
    },
    leftHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    adminIcon: {
        width: 32,
        height: 32,
        marginRight: 4
    },
    adminText: {
        fontSize: 14,
        color: '#666'
    },
    content: {
        marginTop: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bodyText: {
        color: '#666',
        textAlign: 'center',
        fontSize: 14,
        margin: 12
    },
    primaryBtn: {
        backgroundColor: 'black',
        width: 360,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 24
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    QRcode: {
        width: 360,
        height: 390,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#f1f1f1ff',
        borderRadius: 8,
        shadowColor: '#4d4d4dff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 12,
        elevation: 10,
    },
    qr: {
        width: 335,
        height: 335,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    txt:{
        fontSize: 12,
        color: '#666',
        justifyContent: 'center',
        alignContent: "center",
        alignSelf: 'center',
        marginTop: 65
    }

})