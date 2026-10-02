import { View, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function ProductCard({ product }) {
  const {
    isRTL,
    row,
  } = useRTL();

  const {
    favorites,
    toggleFavorite,
  } = useShop();

  if (!product) return null;

  const isFavorite = favorites.some(
    (item) => item.id === product.id
  );

  const handleProductPress = () => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: String(product.id),
      },
    });
  };

  const handleFavoritePress = () => {
    toggleFavorite(product);
  };

  return (
    <Pressable
      onPress={handleProductPress}
      className="w-full mb-5 active:opacity-80"
    >
      {/* Product Image */}
      <View className="w-full h-[180px] rounded-[20px] overflow-hidden bg-[#F3F3F1]">

        <Image
          source={{
            uri:
              product.thumbnail ||
              product.images?.[0],
          }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Wishlist */}
        <Pressable
          onPress={handleFavoritePress}
          className="absolute top-3 w-9 h-9 rounded-full bg-white items-center justify-center active:opacity-70"
          style={{
            [isRTL ? "left" : "right"]: 12,
          }}
        >
          <Ionicons
            name={
              isFavorite
                ? "heart"
                : "heart-outline"
            }
            size={17}
            color={
              isFavorite
                ? "#e11d48"
                : "#111"
            }
          />
        </Pressable>

      </View>

      {/* Product Info */}
      <View className="mt-3 w-full">

        {/* Category */}
        <AppText
          weight="medium"
          numberOfLines={1}
          className="text-gray-400 text-[10px]"
          style={{
            textAlign: isRTL
              ? "right"
              : "left",
            writingDirection:
              isRTL
                ? "rtl"
                : "ltr",
          }}
        >
          {product.category}
        </AppText>

        {/* Title */}
        <View className="h-[40px] mt-1 justify-start">
          <AppText
            weight="semibold"
            numberOfLines={2}
            className="text-black text-[14px] leading-[20px]"
            style={{
              textAlign: isRTL
                ? "right"
                : "left",
              writingDirection:
                isRTL
                  ? "rtl"
                  : "ltr",
            }}
          >
            {product.title}
          </AppText>
        </View>

        {/* Rating + Price */}
        <View
          className="w-full items-center justify-between mt-3"
          style={{
            flexDirection: row,
          }}
        >

          {/* Rating */}
          <View
            className="items-center gap-1"
            style={{
              flexDirection: "row",
            }}
          >
            <Ionicons
              name="star"
              size={12}
              color="#111"
            />

            <AppText
              weight="medium"
              className="text-gray-500 text-[11px]"
            >
              {product.rating?.toFixed(1)}
            </AppText>
          </View>

          {/* Price */}
          <AppText
            weight="bold"
            className="text-black text-[15px]"
          >
            ${product.price}
          </AppText>

        </View>

      </View>

    </Pressable>
  );
}