import "../../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import {
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
} from "@expo-google-fonts/cairo";

import "../i18n/index";
import { ShopProvider } from "../context/ShopContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ShopProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ShopProvider>
  );
}