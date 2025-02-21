import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import Game from './screens/game/game';

const Lua = require('./../assets/images/LuaLua.png'); 

export default function Login() {
    const [gameStart, setGameStart] = useState<boolean | null>(null); 
    const [howToPlay, setHowToPlay] = useState<boolean | null>(null);// Initially null to avoid showing a message immediately
    const [fontsLoaded] = useFonts({
      VarelaRound_400Regular,
        LuckiestGuy_400Regular,
    });

    if (!fontsLoaded) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    if (gameStart === true) {
        return <Game />;
    }

    const handleSubmit = (): void => {
        setGameStart(true);
    };
    const handleHowToPlay = (): void => {
      setHowToPlay(true);
  };

    return (
        <ImageBackground source={Lua} style={styles.background} resizeMode="cover" blurRadius={5}>
            <View style={styles.overlay}> 
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                      <View style={styles.textbox}>
                        <Text style={styles.text}>Will you bag the barclaysman today?</Text>
                        <Text style={styles.text}>10 shots, 100s of players!</Text>
                      </View>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Play</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer1}>
                        <TouchableOpacity onPress={handleHowToPlay} style={styles.button1}>
                                <Text style={styles.button1Text}>How to Play(not done yet)</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Optional: Add a translucent overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        marginTop:'25%',
        // position:'absolute',
        // borderWidth: 2,
        // justifyContent: "center",
        alignItems: 'center',
        borderRadius: 10,
        width: "80%",
    },
    innerContainer: {
      width: '98%',
        // borderWidth: 2,
        justifyContent: "center",
        textAlign:"center",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        shadowRadius: 23,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 1,
        paddingBottom:5,
        // borderRadius: 10,
    },
    inputContainer: {
        // width: '100%',
        marginTop: 5,
        marginBottom:5,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: 'black',
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 3,
        elevation: 10,
        alignSelf: 'center',
        justifyContent: "center",
    },
    textbox:{
      width:'100%',
      justifyContent: "center",
      alignContent:'center',
      alignSelf:'center',
      // borderWidth: 1,
    },
    text:{
      marginBottom:10,
      fontFamily: 'VarelaRound_400Regular',
      alignSelf:'center',
      textAlign:'center',
      fontSize:17,
      color:'black',
    },
    inputContainer1: {
      // width: '50%',
      marginTop: 5,
      borderBottomWidth: 2,
      borderColor: 'black',
      borderRadius: 3,
      // backgroundColor: 'black',
      // shadowColor: '#000',
      // shadowOpacity: 0.7,
      // shadowOffset: { width: 3, height: 3 },
      // shadowRadius: 3,
      // elevation: 10,
      alignSelf: 'center',
      justifyContent: "center",
  },
    button: {
        justifyContent: "center",
        width: '100%',
        // borderWidth: 1,
        // borderColor: 'grey',
        // backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 50,
        fontFamily: 'LuckiestGuy_400Regular',
        color: '#0063A1',
        marginTop: 15,
        opacity:1
    },
    button1: {
      justifyContent: "center",
      width: '100%',
      // borderWidth: 1,
      // borderColor: 'grey',
      // backgroundColor: 'black',
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
  },
  button1Text: {
      fontSize: 19,
      fontFamily: 'VarelaRound_400Regular',
      color: 'black',
      marginTop: 0,
      opacity:1
  },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
