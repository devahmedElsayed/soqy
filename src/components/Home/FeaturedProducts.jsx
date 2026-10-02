import { View, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";

import AppText from "../AppText";
import ProductCard from "./ProductCard";
import useRTL from "../../hooks/useRTL";

export default function FeaturedProducts({
  products = [],
}) {
  const {
    isRTL,
    row,
    textAlign,
    writingDirection,
  } = useRTL();

  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  if (!featuredProducts.length) {
    return null;
  }

  const handleViewAll = () => {
    router.push("/products");
  };

  return (
    <View className="mt-12">

      {/* Section Header */}
      <View
        className="px-6"
        style={{
          flexDirection: row,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* Title */}
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
            className="text-black text-[24px]"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "منتجات مميزة"
              : "Featured Products"}
          </AppText>

          <AppText
            weight="regular"
            className="text-gray-400 text-[11px] mt-1"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "اختيارات مميزة لك"
              : "Our top picks for you"}
          </AppText>
        </View>

        {/* View All */}
        <Pressable
          onPress={handleViewAll}
          className="active:opacity-50"
        >
          <AppText
            weight="medium"
            className="text-gray-500 text-[12px]"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL
              ? "عرض الكل"
              : "View all"}
          </AppText>
        </Pressable>

      </View>

      {/* Products */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 14,
          marginTop: 20,
        }}
      >
        {featuredProducts.map(
          (product) => (
            <View
              key={product.id}
              style={{
                width: 165,
              }}
            >
              <ProductCard
                product={product}
              />
            </View>
          )
        )}
      </ScrollView>

    </View>
  );
}