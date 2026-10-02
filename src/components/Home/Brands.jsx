import {
  View,
  Image,
  Animated,
  Easing,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { useEffect, useRef } from "react";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function Brands({
  products = [],
}) {
  const {
    isRTL,
    textAlign,
    writingDirection,
  } = useRTL();

  const { width } =
    useWindowDimensions();

  const translateX = useRef(
    new Animated.Value(0)
  ).current;

  // استخراج الـ Brands مع صورة من الـ API
  const brandsMap = {};

  products.forEach((product) => {
    if (
      product.brand &&
      !brandsMap[product.brand]
    ) {
      brandsMap[product.brand] = {
        name: product.brand,
        image:
          product.thumbnail ||
          product.images?.[0],
      };
    }
  });

  const brands =
    Object.values(brandsMap);

  if (brands.length === 0) {
    return null;
  }

  // مجموعة واحدة
  const singleSet = brands;

  // تكرار البراندات
  const marqueeBrands = [
    ...singleSet,
    ...singleSet,
    ...singleSet,
  ];

  // عرض كل Brand
  const BRAND_WIDTH = 150;

  // المسافة بين البراندات
  const SEPARATOR_WIDTH = 20;

  // عرض مجموعة واحدة
  const singleSetWidth =
    brands.length *
    (BRAND_WIDTH +
      SEPARATOR_WIDTH);

  useEffect(() => {
    translateX.setValue(
      isRTL
        ? -singleSetWidth
        : 0
    );

    const animation =
      Animated.loop(
        Animated.timing(
          translateX,
          {
            toValue: isRTL
              ? 0
              : -singleSetWidth,
            duration: 30000,
            easing:
              Easing.linear,
            useNativeDriver: true,
          }
        )
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    brands.length,
    singleSetWidth,
    isRTL,
  ]);

  // فتح المنتجات مع البراند
  const handleBrandPress = (
    brand
  ) => {
    router.push({
      pathname: "/products",
      params: {
        brand: brand.name,
      },
    });
  };

  return (
    <View className="mt-14">

      {/* Header */}
      <View
        className="px-6"
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
            ? "علامات نثق بها"
            : "Brands we trust"}
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
            ? "اكتشف منتجات من علامات مميزة"
            : "Discover products from recognized brands"}
        </AppText>
      </View>

      {/* Infinite Marquee */}
      <View
        className="mt-7 overflow-hidden"
        style={{
          width,
        }}
      >
        <Animated.View
          className="flex-row items-center"
          style={{
            width:
              marqueeBrands.length *
              (BRAND_WIDTH +
                SEPARATOR_WIDTH),

            transform: [
              {
                translateX,
              },
            ],
          }}
        >
          {marqueeBrands.map(
            (brand, index) => (
              <View
                key={`${brand.name}-${index}`}
                className="flex-row items-center"
              >

                {/* Brand */}
                <Pressable
                  onPress={() =>
                    handleBrandPress(
                      brand
                    )
                  }
                  className="h-[90px] items-center justify-center active:opacity-60"
                  style={{
                    width:
                      BRAND_WIDTH,
                  }}
                >
                  {/* Image */}
                  <View className="w-[48px] h-[48px] rounded-full bg-gray-50 overflow-hidden">
                    <Image
                      source={{
                        uri: brand.image,
                      }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>

                  {/* Name */}
                  <AppText
                    weight="semibold"
                    numberOfLines={1}
                    className="text-[11px] text-gray-700 mt-2"
                    style={{
                      textAlign:
                        "center",
                      writingDirection,
                    }}
                  >
                    {brand.name}
                  </AppText>
                </Pressable>

                {/* Separator */}
                <View
                  className="w-1.5 h-1.5 rounded-full bg-gray-300"
                  style={{
                    marginHorizontal: 7,
                  }}
                />

              </View>
            )
          )}
        </Animated.View>
      </View>

      {/* Bottom Line */}
      <View className="mx-6 mt-2 h-[1px] bg-gray-100" />

    </View>
  );
}