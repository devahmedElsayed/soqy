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

export default function BestSellers({
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

  // ترتيب Best Sellers حسب Rating
  const bestSellers = [...products]
    .sort(
      (a, b) =>
        (b.rating || 0) -
        (a.rating || 0)
    )
    .slice(0, 6);

  // عكس ترتيب المنتجات في العربي
  const displayedProducts = isRTL
    ? [...bestSellers].reverse()
    : bestSellers;

  const handleProductPress = (
    product
  ) => {
    router.push({
      pathname: "/product/[id]",
      params: {
        id: String(product.id),
      },
    });
  };

  const handleFavoritePress = (
    product
  ) => {
    toggleFavorite(product);
  };

  const handleAddToCart = (
    product
  ) => {
    addToCart(product);
  };

  const isFavorite = (productId) => {
    return favorites.some(
      (item) =>
        item.id === productId
    );
  };

  return (
    <View className="mt-12">

      {/* Header */}
      <View
        className="px-6 items-center justify-between"
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
            className="text-[22px] text-black"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "الأكثر مبيعًا"
              : "Best Sellers"}
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
              ? "المنتجات المفضلة لدى عملائنا"
              : "Our customers' favorite picks"}
          </AppText>
        </View>

        <View className="ml-4 px-3.5 py-2 rounded-full bg-gray-100">
          <AppText
            weight="semibold"
            className="text-[10px] text-gray-500"
          >
            {String(
              bestSellers.length
            ).padStart(2, "0")}{" "}
            {isRTL
              ? "منتجات"
              : "ITEMS"}
          </AppText>
        </View>
      </View>

      {/* Products */}
      <ScrollView
        horizontal
        inverted={isRTL}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 5,
          gap: 16,
        }}
      >
        {displayedProducts.map(
          (product) => {
            const favorite =
              isFavorite(
                product.id
              );

            return (
              <Pressable
                key={product.id}
                onPress={() =>
                  handleProductPress(
                    product
                  )
                }
                className="w-[230px] rounded-[28px] bg-gray-50 overflow-hidden active:opacity-80"
              >
                {/* Image */}
                <View className="h-[230px] bg-white relative">

                  <Image
                    source={{
                      uri:
                        product.images?.[0] ||
                        product.thumbnail,
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />

                  {/* Rating */}
                  <View
                    className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black items-center"
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Ionicons
                      name="star"
                      size={11}
                      color="#fff"
                    />

                    <AppText
                      weight="bold"
                      className="text-[10px] text-white ml-1"
                    >
                      {product.rating?.toFixed(
                        1
                      )}
                    </AppText>
                  </View>

                  {/* Discount */}
                  {product.discountPercentage >
                    0 && (
                    <View className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white">
                      <AppText
                        weight="bold"
                        className="text-[10px] text-black"
                      >
                        -
                        {Math.round(
                          product.discountPercentage
                        )}
                        %
                      </AppText>
                    </View>
                  )}

                  {/* Favorite */}
                  <Pressable
                    onPress={() =>
                      handleFavoritePress(
                        product
                      )
                    }
                    className="absolute bottom-4 left-4 w-11 h-11 rounded-full bg-white items-center justify-center active:opacity-70"
                  >
                    <Ionicons
                      name={
                        favorite
                          ? "heart"
                          : "heart-outline"
                      }
                      size={18}
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
                    className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-black items-center justify-center active:opacity-70"
                  >
                    <Ionicons
                      name="add"
                      size={22}
                      color="#fff"
                    />
                  </Pressable>
                </View>

                {/* Info */}
                <View className="p-4">

                  <AppText
                    weight="semibold"
                    numberOfLines={1}
                    className="text-[15px] text-black"
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
                    className="text-[11px] text-gray-400 mt-1"
                    style={{
                      textAlign,
                      writingDirection,
                    }}
                  >
                    {product.category}
                  </AppText>

                  <View
                    className="items-center justify-between mt-4"
                    style={{
                      flexDirection: row,
                    }}
                  >
                    <AppText
                      weight="bold"
                      className="text-[16px] text-black"
                    >
                      ${product.price}
                    </AppText>

                    <AppText
                      weight="medium"
                      className="text-[10px] text-gray-400"
                    >
                      {isRTL
                        ? "متوفر"
                        : "In stock"}
                    </AppText>
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