import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PassScreen({ route }) {
    const navigation = useNavigation();

    const {
        fullName,
        phone,
        email,
        whomToMeet,
        purpose,
        frontImage,
        backImage,
    } = route.params;
    console.log(frontImage);
    console.log(backImage);

    return (
        <View style={styles.passCard}>
            <Text style={styles.heading}>Digital Visitor Pass</Text>
            <View style={styles.content}>
                <Text style={styles.text}>Name: {fullName}</Text>
                <Text style={styles.text}>Phone: {phone}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Meeting: {whomToMeet}</Text>
                <Text style={styles.text}>Purpose: {purpose}</Text>
            </View>
            <View style={styles.images}>

                <Image source={{ uri: frontImage }} style={styles.cnic} />
                <Image source={{ uri: backImage }} style={styles.cnic} />
            </View>
            <View style={styles.passbutton}>
                <View>
                    <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.btnText}>Close Pass</Text>
                </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.primaryBtn}
                    onPress={() => {
                        navigation.navigate('AdminDashboardScreen', {
                            newVisitor: {
                                id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                                name: fullName,
                                phone: phone, 
                                email: email,
                                purpose: purpose,
                                whomToMeet: whomToMeet,
                                date: new Date().toString().split('T')[0],
                                status: 'pending',
                                frontImage,
                                backImage,
                            },
                        });
                    }}
                    >
                    <Text style={styles.btnText}>Send to Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    passCard: {
        backgroundColor: 'white',
        width: 340,
        justifyContent: 'flex-start',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 40,
        marginLeft: 30,
        marginTop: 220,
        borderRadius: 12,
        shadowColor: '#4d4d4dff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 12,
        elevation: 10,

    },
    content: {
        flexDirection: 'column',
    },
    heading: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    images: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        paddingBottom: 8,
        color: '#687280'
    },
    cnic: {
        width: 140,
        height: 90,
        borderRadius: 8,
    },
    primaryBtn: {
        backgroundColor: '#4baafb',
        width: 300,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    passbutton:{
        flexDirection: 'column'
    }

})