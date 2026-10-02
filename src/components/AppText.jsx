import { Text } from "react-native";
import React from "react";

export default function AppText({
  children,
  className,
  weight = "regular",
}) {
  const fonts = {
    regular: "Cairo_400Regular",
    medium: "Cairo_500Medium",
    semibold: "Cairo_600SemiBold",
    bold: "Cairo_700Bold",
  };

  return (
    <Text
      className={className}
      style={{ fontFamily: fonts[weight] }}
    >
      {children}
    </Text>
  );
}