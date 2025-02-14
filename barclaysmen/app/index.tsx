import { useNavigation } from 'expo-router';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Login from './login';
import Header from './components/header';


export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
<Header title={"BarclaysMen"}/>
  <Login/>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
})
