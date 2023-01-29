import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from "./SingupScreen";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from "./Login";
import PasswordList from "./PasswordList";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const Stack = createNativeStackNavigator();

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignUpScreen"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
            }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
            <Stack.Screen name="PasswordList" component={PasswordList}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
