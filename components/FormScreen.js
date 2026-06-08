import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function FormScreen() {
    const navigation = useNavigation();
    const [FrontImage, setFrontImage] = useState(null);
    const [backImage, setbackImage] = useState(null);

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [whomToMeet, setWhomToMeet] = useState('');
    const [purpose, setpurpose] = useState('');

    const pickImage = async (type) => { //type = front and back 
        const result = await ImagePicker.launchImageLibraryAsync({ //allow the user to uplaod the file form gallery and await until user uplaod the file and store the image in the result 
            mediaTypes: ['images'], //type of media is images 
            allowsEditing: true, //user can drag and drop the image 
            quality: 1,   //maximum only one image at a time 
        });

        if (!result.canceled) { //if the user havn't cancel 
            if (type == 'front') { //type == front -> than upload front 
                setFrontImage(result.assets[0].uri);
            }
            else { //type == back than upload back and store the uri link 
                setbackImage(result.assets[0].uri)
            }
        }

    };

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.parentContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.back}>
                            <Image source={require('../assets/my-images/back.png')} style={styles.backIcon} />
                            <Text style={styles.Title}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Image style={styles.logo} source={require('../assets/my-images/logo.png')} />
                            <View style={styles.groupContent}>
                                <Text style={styles.text}>Visitor check-in</Text>
                                <Text style={styles.bodytxt}>Your information is used only to issue your entry pass.</Text>
                            </View>
                        </View>
                        <View style={styles.form}>
                            <View style={styles.field}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.default}
                                    placeholder='Ali khan'
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Phone Number</Text>
                                <TextInput
                                    style={styles.default}
                                    placeholder='+9200000000'
                                    value={phone}
                                    onChangeText={setPhone}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Email Address</Text>
                                <TextInput
                                    style={styles.default}
                                    placeholder='alikhan@gmail.com'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Whom to meet</Text>
                                <TextInput
                                    style={styles.default}
                                    placeholder='e,g: Zamran Ahmad, HR'
                                    value={whomToMeet}
                                    onChangeText={setWhomToMeet}
                                />
                            </View>
                            <View style={styles.field}>
                                <Text style={styles.label}>Purpose (Optional)</Text>
                                <TextInput
                                    style={styles.default}
                                    placeholder='Brief purpose of visit'
                                    value={purpose}
                                    onChangeText={setpurpose}
                                />
                            </View>
                            <Text style={styles.label}>Upload front & back side of your CNIC</Text>
                            <View style={styles.uploadFile}>
                                <TouchableOpacity onPress={() => pickImage('front')}>
                                    <View style={styles.fontside}>
                                        {
                                            FrontImage ? (
                                                <Image source={{ uri: FrontImage }}
                                                    style={{
                                                        width: 140,
                                                        height: 80,
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <Image source={require('../assets/my-images/upload.png')} />
                                                    <Text style={styles.upload}>Click to upload file </Text>
                                                </>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => pickImage('back')}>
                                    <View style={styles.fontside}>
                                        {
                                            backImage ? (
                                                <Image source={{ uri: backImage }}
                                                    style={{
                                                        width: 140,
                                                        height: 80
                                                    }}
                                                />
                                            ) : (
                                                <>
                                                    <Image source={require('../assets/my-images/upload.png')} />
                                                    <Text style={styles.upload}>Click to upload file </Text>

                                                </>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('PassScreen', {
                            fullName,
                            phone,
                            email,
                            whomToMeet,
                            purpose,
                            frontImage: FrontImage,
                            backImage : backImage,
                        })}>
                            <Text style={styles.btnText}>Save & Get my pass</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f3f7fc'
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        position: 'absolute',
        top: 10,
        left: 16
    },
    Title: {
        fontSize: 14,
        fontWeight: 'semibold',
        top: 2
    },
    content: {
        position: 'absolute',
        top: 60,
        left: 16,
        gap: 4,
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
        width: 50,
        height: 50
    },
    groupContent: {
        flexDirection: 'column',
        gap: 3
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    bodytxt: {
        fontSize: 12,
        color: '#687280'
    },
    form: {
        position: 'absolute',
        top: 130,
        left: 30,
        gap: 12
    },
    field: {
        gap: 6,
        flexDirection: 'column'
    },
    default: {
        backgroundColor: 'white',
        width: 345,
        height: 44,
        paddingLeft: 8,
        borderRadius: 10,
        borderColor: '#dfdfdfff',
        borderWidth: 1
    },
    label: {
        fontSize: 14,
        color: '#4e4e4eff'
    },
    uploadFile: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12
    },
    fontside: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 165,
        borderRadius: 12,
        borderRadius: 10,
        borderColor: '#dfdfdfff',
        borderWidth: 1,
        gap: 12
    },
    upload: {
        fontSize: 12,
        color: '#4e4e4eff'
    },
    primaryBtn: {
        backgroundColor: '#4baafb',
        width: 360,
        height: 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 680
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})