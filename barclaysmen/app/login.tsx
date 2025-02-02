import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import Game from './screens/game/game'

export default function Login() {
    const [passwordInput, setPasswordInput] = useState('');
    const [validated, setValidated] = useState<boolean | null>(null); // Initially null to avoid showing a message immediately
    
    if (validated === true) {
        return <Game />;
      }
    // Correct Password
    const correctPassword = '123';
  
    // Handle Submit
    const handleSubmit = (): void => {
      if (passwordInput === correctPassword) {
        setValidated(true);
        console.log('Password Correct ✅');
      } else {
        setValidated(false);
        console.log('Password Incorrect ❌');
      }
    };
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Login</Text>

    <View style={styles.inputContainer}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Username:</Text>
        <TextInput style={styles.input} placeholder="Enter username" />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(text) => setPasswordInput(text)} // Store input in state
        />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
     
      {validated === false && <Text style={styles.errorText}>❌ Incorrect Password</Text>}
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        marginBottom:300,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      width: 300,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    inputRow: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      width: 80,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#f9f9f9',
    },
    button: {
      marginTop: 10,
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    successText: {
      marginTop: 10,
      fontSize: 16,
      color: 'green',
    },
    errorText: {
      marginTop: 10,
      fontSize: 16,
      color: 'red',
    },
  });
  