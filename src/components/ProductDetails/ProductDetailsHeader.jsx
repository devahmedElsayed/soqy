import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProductDetailsHeader({
  isFavorite,
  onFavorite,
}) {
  const { isRTL, row } = useRTL();

  return (
    <View
      className="px-6 py-3 items-center justify-between bg-white"
      style={{
        flexDirection: row,
      }}
    >
      <Pressable
        onPress={() => router.back()}
        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
      >
        <Ionicons
          name={
            isRTL
              ? "arrow-forward"
              : "arrow-back"
          }
          size={19}
          color="#111"
        />
      </Pressable>

      <AppText
        weight="bold"
        className="text-[16px] text-black"
      >
        {isRTL
          ? "تفاصيل المنتج"
          : "Product Details"}
      </AppText>

      <Pressable
        onPress={onFavorite}
        className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
      >
        <Ionicons
          name={
            isFavorite
              ? "heart"
              : "heart-outline"
          }
          size={19}
          color="#111"
        />
      </Pressable>
    </View>
  );
}