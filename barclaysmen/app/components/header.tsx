import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator  } from 'react-native';
import { useFonts, VarelaRound_400Regular } from '@expo-google-fonts/varela-round'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Calculate a responsive font size
const baseFontSize = (width / 100) * 12;  // Font size based on screen width
const maxFontSize = 55; 
const responsiveFontSize = Math.min(baseFontSize, maxFontSize);
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
    backgroundColor:'black',
    opacity:1,
  },
  header: {
    // borderWidth:1,
    // borderColor:'white',
    width:'98%',
    color: '#0063A1',
    // marginTop:30,
    fontSize: responsiveFontSize,
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