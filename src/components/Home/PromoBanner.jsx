import { View, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function PromoBanner({ products = [] }) {
  const { isRTL, row, textAlign, writingDirection } = useRTL();

  const product = products.find(
    (item) => item.discountPercentage > 15 && item.images?.[0]
  );

  if (!product) return null;

  return (
    <View className="mt-14 px-6">
      <View className="h-[205px] rounded-[30px] overflow-hidden bg-black relative">

        {/* Background */}
        <Image
          source={{
            uri: product.images?.[0] || product.thumbnail,
          }}
          className="absolute inset-0 w-full h-full"
          resizeMode="cover"
        />

        {/* Overlay */}
        <View className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <View
          className="flex-1 justify-center px-6"
          style={{
            alignItems: isRTL ? "flex-end" : "flex-start",
          }}
        >
          {/* Small Label */}
          <View className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
            <AppText
              weight="semibold"
              className="text-[9px] text-white tracking-[1px]"
            >
              {isRTL ? "عرض لفترة محدودة" : "LIMITED TIME OFFER"}
            </AppText>
          </View>

          {/* Title */}
          <AppText
            weight="bold"
            numberOfLines={1}
            className="text-[24px] text-white mt-3"
            style={{
              textAlign,
              writingDirection,
            }}
          >
            {isRTL ? "خصم مميز بانتظارك" : "A special offer awaits"}
          </AppText>

          {/* Description */}
          <AppText
            weight="regular"
            numberOfLines={2}
            className="text-[11px] text-white/70 mt-1.5"
            style={{
              textAlign,
              writingDirection,
              maxWidth: 250,
            }}
          >
            {isRTL
              ? `وفر حتى ${Math.round(
                  product.discountPercentage
                )}% على منتجات مختارة`
              : `Save up to ${Math.round(
                  product.discountPercentage
                )}% on selected products`}
          </AppText>

          {/* Button */}
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: product.id },
              })
            }
            className="mt-4 h-10 px-4 rounded-full bg-white active:opacity-80"
          >
            <View
              className="h-full items-center"
              style={{
                flexDirection: row,
              }}
            >
              <AppText
                weight="semibold"
                className="text-[11px] text-black"
              >
                {isRTL ? "اكتشف العرض" : "Shop offer"}
              </AppText>

              <Ionicons
                name={isRTL ? "arrow-back" : "arrow-forward"}
                size={13}
                color="#000"
                style={{
                  marginLeft: isRTL ? 0 : 7,
                  marginRight: isRTL ? 7 : 0,
                }}
              />
            </View>
          </Pressable>
        </View>

        {/* Discount Badge */}
        <View
          className="absolute top-5 px-4 py-2 rounded-full bg-white"
          style={{
            right: isRTL ? undefined : 20,
            left: isRTL ? 20 : undefined,
          }}
        >
          <AppText
            weight="bold"
            className="text-[12px] text-black"
          >
            -{Math.round(product.discountPercentage)}%
          </AppText>
        </View>
      </View>
    </View>
  );
}