import {
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function NewArrivals({
  products = [],
}) {
  const {
    isRTL,
    row,
    textAlign,
    writingDirection,
  } = useRTL();

  const {
    favorites,
    toggleFavorite,
    addToCart,
  } = useShop();

  const newArrivals = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 6);

  const displayedProducts = isRTL
    ? [...newArrivals].reverse()
    : newArrivals;

  const handleProductPress = (product) => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: String(product.id),
      },
    });
  };

  const handleFavoritePress = (product) => {
    toggleFavorite(product);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (item) => item.id === productId
    );
  };

  if (newArrivals.length === 0) {
    return null;
  }

  return (
    <View className="mt-16">

      {/* Header */}
      <View
        className="px-6 items-center"
        style={{
          flexDirection: row,
        }}
      >
        <View
          className="flex-1"
          style={{
            alignItems: isRTL
              ? "flex-end"
              : "flex-start",
          }}
        >
          <AppText
            weight="bold"
            className="text-[23px] text-black"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "وصل حديثًا"
              : "New Arrivals"}
          </AppText>

          <AppText
            weight="regular"
            className="text-[12px] text-gray-400 mt-1"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "اكتشف أحدث المنتجات"
              : "Discover our latest products"}
          </AppText>
        </View>

        <View className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center">
          <Ionicons
            name={
              isRTL
                ? "arrow-back"
                : "arrow-forward"
            }
            size={16}
            color="#111"
          />
        </View>
      </View>

      {/* Products */}
      <ScrollView
        horizontal
        inverted={isRTL}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 22,
          gap: 14,
        }}
      >
        {displayedProducts.map(
          (product) => {
            const favorite =
              isFavorite(product.id);

            return (
              <Pressable
                key={product.id}
                onPress={() =>
                  handleProductPress(
                    product
                  )
                }
                className="w-[190px] active:opacity-80"
              >
                {/* Image */}
                <View className="w-[190px] h-[220px] rounded-[26px] bg-gray-50 overflow-hidden relative">

                  <Image
                    source={{
                      uri:
                        product.images?.[0] ||
                        product.thumbnail,
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  {/* New Badge */}
                  <View
                    className="absolute top-3 px-3 py-1.5 rounded-full bg-white"
                    style={{
                      right: isRTL
                        ? undefined
                        : 12,
                      left: isRTL
                        ? 12
                        : undefined,
                    }}
                  >
                    <AppText
                      weight="bold"
                      className="text-[9px] text-black"
                    >
                      {isRTL
                        ? "جديد"
                        : "NEW"}
                    </AppText>
                  </View>

                  {/* Favorite */}
                  <Pressable
                    onPress={() =>
                      handleFavoritePress(
                        product
                      )
                    }
                    className="absolute top-3 w-9 h-9 rounded-full bg-white items-center justify-center active:opacity-70"
                    style={{
                      left: isRTL
                        ? undefined
                        : 12,
                      right: isRTL
                        ? 12
                        : undefined,
                    }}
                  >
                    <Ionicons
                      name={
                        favorite
                          ? "heart"
                          : "heart-outline"
                      }
                      size={16}
                      color={
                        favorite
                          ? "#e11d48"
                          : "#111"
                      }
                    />
                  </Pressable>

                  {/* Add To Cart */}
                  <Pressable
                    onPress={() =>
                      handleAddToCart(
                        product
                      )
                    }
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black items-center justify-center active:opacity-70"
                  >
                    <Ionicons
                      name="add"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>

                {/* Product Info */}
                <View className="pt-3 px-1">

                  <AppText
                    weight="semibold"
                    numberOfLines={1}
                    className="text-[14px] text-black"
                    style={{
                      textAlign,
                      writingDirection,
                    }}
                  >
                    {product.title}
                  </AppText>

                  <AppText
                    weight="regular"
                    numberOfLines={1}
                    className="text-[10px] text-gray-400 mt-1"
                    style={{
                      textAlign,
                      writingDirection,
                    }}
                  >
                    {product.category}
                  </AppText>

                  <View
                    className="items-center justify-between mt-2"
                    style={{
                      flexDirection: row,
                    }}
                  >
                    <AppText
                      weight="bold"
                      className="text-[15px] text-black"
                    >
                      ${product.price}
                    </AppText>

                    <View className="flex-row items-center">
                      <Ionicons
                        name="star"
                        size={10}
                        color="#111"
                      />

                      <AppText
                        weight="semibold"
                        className="text-[10px] text-gray-500 ml-1"
                      >
                        {product.rating?.toFixed(
                          1
                        )}
                      </AppText>
                    </View>
                  </View>

                </View>
              </Pressable>
            );
          }
        )}
      </ScrollView>
    </View>
  );
}