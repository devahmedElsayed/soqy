import { useState } from "react";
import { View, Pressable } from "react-native";

import AppText from "../AppText";
import ProductCard from "./ProductCard";
import useRTL from "../../hooks/useRTL";

export default function AllProducts({
  products = [],
}) {
  const {
    isRTL,
    textAlign,
    writingDirection,
  } = useRTL();

  const [visibleCount, setVisibleCount] =
    useState(6);

  if (!products.length) return null;

  const visibleProducts =
    products.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount(
      (prev) => prev + 6
    );
  };

  const hasMoreProducts =
    visibleCount < products.length;

  return (
    <View className="mt-12 px-6">

      {/* Section Header */}
      <View
        className="mb-5"
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
            ? "كل المنتجات"
            : "All Products"}
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
            ? "اكتشف جميع المنتجات"
            : "Explore our complete collection"}
        </AppText>
      </View>

      {/* Products Grid */}
      <View className="flex-row flex-wrap justify-between">
        {visibleProducts.map(
          (product) => (
            <View
              key={product.id}
              className="w-[48%]"
            >
              <ProductCard
                product={product}
              />
            </View>
          )
        )}
      </View>

      {/* View More */}
      {hasMoreProducts && (
        <View className="items-center mt-2">
          <Pressable
            onPress={handleViewMore}
            className="h-11 px-8 rounded-full bg-black items-center justify-center active:opacity-70"
          >
            <AppText
              weight="semibold"
              className="text-white text-[12px]"
            >
              {isRTL
                ? "عرض المزيد"
                : "View More"}
            </AppText>
          </Pressable>
        </View>
      )}

    </View>
  );
}