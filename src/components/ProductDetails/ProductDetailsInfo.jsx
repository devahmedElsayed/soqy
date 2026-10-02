import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProductDetailsInfo({
  product,
}) {
  const { isRTL, row, textAlign } = useRTL();

  return (
    <View className="px-6 pt-5">

      {/* Title */}

      <AppText
        weight="bold"
        className="text-[22px] text-black"
        style={{ textAlign }}
      >
        {product.title}
      </AppText>

      {/* Brand */}

      <View
        className="items-center mt-2"
        style={{
          flexDirection: row,
        }}
      >
        <AppText
          weight="medium"
          className="text-[11px] text-gray-400"
        >
          {product.brand ||
            product.category}
        </AppText>

        <View className="w-1 h-1 rounded-full bg-gray-300 mx-2" />

        <AppText
          weight="medium"
          className="text-[11px] text-gray-400"
        >
          {product.category}
        </AppText>
      </View>

      {/* Price */}

      <View
        className="items-center justify-between mt-4"
        style={{
          flexDirection: row,
        }}
      >
        <AppText
          weight="bold"
          className="text-[24px] text-black"
        >
          ${product.price}
        </AppText>

        <View
          className="items-center"
          style={{
            flexDirection: row,
          }}
        >
          <Ionicons
            name="star"
            size={15}
            color="#111"
          />

          <AppText
            weight="bold"
            className="text-[12px] text-black ml-2"
          >
            {product.rating?.toFixed(1)}
          </AppText>
        </View>
      </View>

      {/* Description */}

      <View className="mt-5">

        <AppText
          weight="bold"
          className="text-[15px] text-black mb-2"
        >
          {isRTL
            ? "الوصف"
            : "Description"}
        </AppText>

        <AppText
          weight="regular"
          className="text-[12px] leading-6 text-gray-500"
          style={{ textAlign }}
        >
          {product.description}
        </AppText>

      </View>

      {/* Stock */}

      <View
        className="mt-5 px-4 py-4 rounded-xl bg-gray-100 items-center justify-between"
        style={{
          flexDirection: row,
        }}
      >
        <AppText
          weight="medium"
          className="text-[11px] text-gray-600"
        >
          {isRTL ? "المخزون" : "Stock"}
        </AppText>

        <AppText
          weight="bold"
          className="text-[12px] text-black"
        >
          {product.stock}
        </AppText>
      </View>

    </View>
  );
}