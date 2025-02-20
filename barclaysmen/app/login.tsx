import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import Game from './screens/game/game';

const Lua = require('./../assets/images/LuaLua.png'); 

export default function Login() {
    const [gameStart, setGameStart] = useState<boolean | null>(null); // Initially null to avoid showing a message immediately
    const [fontsLoaded] = useFonts({
        Chewy_400Regular,
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

    return (
        <ImageBackground source={Lua} style={styles.background} resizeMode="cover" blurRadius={5}>
            <View style={styles.overlay}> 
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                                <Text style={styles.buttonText}>Play</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: Add a translucent overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        // borderWidth: 2,
        justifyContent: "center",
        borderRadius: 10,
        width: "50%",
    },
    innerContainer: {
        // borderWidth: 2,
        justifyContent: "center",
    },
    inputContainer: {
        // width: '50%',
        // padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        // backgroundColor: 'black',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 3, height: 3 },
        shadowRadius: 3,
        elevation: 10,
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
