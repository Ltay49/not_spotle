import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// Custom Header Component
const Header = ({ title }: { title: string }) => {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:1 , // Optional: Add margin to the top if needed
  },
  header: {
    marginTop:80,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center', // Ensures text is centered in its container
  },
});

export default Header