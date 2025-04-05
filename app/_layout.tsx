import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useRouter } from 'expo-router';
// import { Text } from 'react-native-paper';
import { Text } from 'react-native';


import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()


  const [loaded] = useFonts({
    'PPNeueMontreal': require('../assets/fonts/PPNeueMontreal-Book.otf'),
    'EspecialFont': require('../assets/fonts/EditorialNew-UltralightItalic.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = { fontFamily: 'PPNeueMontreal' };
      router.replace('/login')
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <PaperProvider theme={theme} >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}



