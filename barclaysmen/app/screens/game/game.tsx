import { useNavigation } from 'expo-router';
import { Text, StyleSheet, View,ScrollView, Platform, Dimensions} from 'react-native';
import { useEffect, useState } from 'react';
import Questions from './questions';


const isWeb = Platform.OS === 'web';
const screenWidth = Dimensions.get('window').width;

export default function GamePage() {
    return (
        <View style={styles.wrapper}>
            <ScrollView contentContainerStyle={styles.container}>
                <Questions />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
  },
  container: {
      width: isWeb ? '150%' : '100%',
      maxWidth: isWeb ? 1000 : '100%',
      borderWidth: 2,
      borderColor: 'black',
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'lightgray',
      minHeight: 300,
      alignItems: 'center',
      justifyContent: 'center', 
  },
});
