import { useSegments, router } from "expo-router";
import { useEffect } from "react";

import { useStore } from "@/stores/store";

// This hook will protect the route access based on user authentication.
// export function useProtectedRoute(user) {
export function useProtectedRoute() {
  const segments = useSegments();
  const { user } = useStore();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the login page.
      // Use setTimeout - https://github.com/expo/router/issues/745
      setTimeout(() => router.replace("login"), 1);
      // router.replace("(auth)");
    } else if (user && inAuthGroup) {
      // Redirect away from the login page.
      router.replace("(tabs)");
    }
  }, [user, segments]);
}
