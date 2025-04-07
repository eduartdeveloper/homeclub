import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

// React Native Paper
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';


SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout(): JSX.Element | null {

  // Cargar fuentes personalizadas
  const [fontsLoaded] = useFonts({
    PPNeueMontreal: require('../assets/fonts/PPNeueMontreal-Book.otf'),
    EspecialFont: require('../assets/fonts/EditorialNew-UltralightItalic.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // Ocultar SplashScreen al terminar de cargar fuentes
      SplashScreen.hideAsync();

      
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = {
        fontFamily: 'PPNeueMontreal',
      };
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
