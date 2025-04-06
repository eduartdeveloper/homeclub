import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

// Paper
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [loaded] = useFonts({
    'PPNeueMontreal': require('../assets/fonts/PPNeueMontreal-Book.otf'),
    'EspecialFont': require('../assets/fonts/EditorialNew-UltralightItalic.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: 'PPNeueMontreal' };
      // router.replace('/login');
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <StatusBar style="auto" />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
