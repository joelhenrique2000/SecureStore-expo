import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { NativeBaseProvider } from 'native-base';
import MainScreen from './screens/MainScreen';
import CriarScreen from './screens/CriarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const Stack = createNativeStackNavigator();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen  name="Main" component={MainScreen} />
              <Stack.Screen name="Criar" component={CriarScreen} />
              <Stack.Screen name="Editar" component={MainScreen} />
            </Stack.Navigator>
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}
