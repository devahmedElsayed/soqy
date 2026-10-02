import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function ProductsHeader({ productsCount }) {
  const { isRTL, row } = useRTL();

  const { favorites } = useShop();

  const favoritesCount = favorites.length;

  return (
    <View className="px-6 pt-5 pb-3">

      <View
        className="items-center justify-between"
        style={{ flexDirection: row }}
      >

        {/* Title */}

        <View>
          <AppText
            weight="bold"
            className="text-[26px] text-black"
          >
            {isRTL
              ? "المنتجات"
              : "Products"}
          </AppText>

          <AppText
            weight="regular"
            className="text-[11px] text-gray-400 mt-1"
          >
            {isRTL
              ? `${productsCount} منتج`
              : `${productsCount} products`}
          </AppText>
        </View>

        {/* Favorites */}

        <View className="relative">

          <Pressable
            onPress={() =>
              router.push("/favorites")
            }
            className="w-11 h-11 rounded-full bg-black items-center justify-center active:opacity-70"
          >
            <Ionicons
              name="heart-outline"
              size={20}
              color="#fff"
            />
          </Pressable>

          {/* Favorites Badge */}

          {favoritesCount > 0 && (
            <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black border-2 border-white items-center justify-center">
              <AppText
                weight="bold"
                className="text-white text-[8px]"
              >
                {favoritesCount > 99
                  ? "99+"
                  : favoritesCount}
              </AppText>
            </View>
          )}

        </View>

      </View>

    </View>
  );
}