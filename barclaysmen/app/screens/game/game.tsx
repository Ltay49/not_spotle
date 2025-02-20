import { ImageBackground, StyleSheet, View, Platform, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Questions from './questions';

const Lua = require('../../../assets/images/LuaLua.png'); // Ensure the path is correct

const isWeb = Platform.OS === 'web';
const screenWidth = Dimensions.get('window').width;

export default function GamePage() {
    return (
        <ImageBackground source={Lua} style={styles.background} resizeMode="cover" blurRadius={5}>
            <View style={styles.overlay}> 
                <Questions />
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
        backgroundColor: 'rgba(255, 255, 255, 0.35)', // Optional: Add a translucent overlay
        justifyContent: 'center',
        alignItems: 'center',
    }
});
