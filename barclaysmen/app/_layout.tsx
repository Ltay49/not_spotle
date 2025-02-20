import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
         headerShown: false, 
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="login" options={{}} />
    </Stack>
  );
}