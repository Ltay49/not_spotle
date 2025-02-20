import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// Custom Header Component
const Header = ({ title }: { title: string }) => {
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
    borderBottomWidth:2,
    borderColor:'grey',
    // backgroundColor:'grey'
  },
  header: {
    // borderWidth:1,
    // borderColor:'white',
    color: '#0063A1',
    marginTop:36,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center', // Ensures text is centered in its container
  },
});

export default Header