import FontAwesome from "@expo/vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { AppProvider } from "@/providers/app";
import { useStore } from "@/stores/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Set an hasInitializedAuth state whilst Firebase connects
  const [hasInitializedAuth, sethasInitializedAuth] = useState(false);
  const { setUser } = useStore();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!hasInitializedAuth) sethasInitializedAuth(true);
    });
    // Returning subcriber(), calls the function and returns nothing rather than returning the function itself
    return subscriber;
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && hasInitializedAuth) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !hasInitializedAuth) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useProtectedRoute();
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
