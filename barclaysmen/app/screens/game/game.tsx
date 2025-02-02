import { useNavigation } from 'expo-router';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Questions from './questions';
export default function gamePage (){

    return(

    <View style={styles.container}>
    <Questions/>
    </View>
    
    )    
}

const styles = StyleSheet.create({
    container: {
      height:'50%',
      width:'90%',
        paddingTop:-10,
        marginTop:-10,
        borderWidth:2,
        borderColor:'Black',
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'grey',
      },

})
