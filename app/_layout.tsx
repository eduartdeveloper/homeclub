import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useRouter } from 'expo-router';

import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter()


  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
      router.replace('/login')
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <PaperProvider theme={theme} >
      <Stack>
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
