import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator  } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round'
// Custom Header Component
const Header = ({ title }: { title: string }) => {

  const [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
});

if (!fontsLoaded) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
        </View>
    );
}

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderBottomWidth:2,
    borderColor:'black',
    backgroundColor:'black'
  },
  header: {
    // borderWidth:1,
    // borderColor:'white',
    width:'98%',
    color: '#0063A1',
    marginTop:36,
    fontSize: 60,
    fontFamily:'VarelaRound_400Regular',
    fontWeight: 'bold',
    textAlign: 'center', // Ensures text is centered in its container
  },
  loadingContainer: {
    display:'none',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
},
});

export default Header