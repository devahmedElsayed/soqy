import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProductDetailsActions({
  product,
  quantity,
  isAdded,
  onIncrease,
  onDecrease,
  onAddToCart,
}) {
  const { isRTL, row } = useRTL();

  return (
    <View className="px-6">

      {/* Quantity */}

      <View className="mt-6">

        <AppText
          weight="bold"
          className="text-[15px] text-black mb-3"
        >
          {isRTL ? "الكمية" : "Quantity"}
        </AppText>

        <View
          className="h-12 rounded-xl bg-gray-100 px-2 items-center justify-between"
          style={{
            flexDirection: row,
          }}
        >
          <Pressable
            onPress={onDecrease}
            disabled={quantity === 1}
            className="w-9 h-9 rounded-lg bg-white items-center justify-center"
          >
            <Ionicons
              name="remove"
              size={16}
              color={quantity === 1 ? "#ccc" : "#111"}
            />
          </Pressable>

          <AppText
            weight="bold"
            className="text-[14px] text-black"
          >
            {quantity}
          </AppText>

          <Pressable
            onPress={onIncrease}
            disabled={quantity >= product.stock}
            className="w-9 h-9 rounded-lg bg-white items-center justify-center"
          >
            <Ionicons
              name="add"
              size={16}
              color={
                quantity >= product.stock
                  ? "#ccc"
                  : "#111"
              }
            />
          </Pressable>
        </View>

      </View>

      {/* Add To Cart */}

      <Pressable
        onPress={onAddToCart}
        className={`mt-5 h-14 rounded-2xl items-center justify-center ${
          isAdded ? "bg-gray-200" : "bg-black"
        }`}
      >
        <View
          className="items-center"
          style={{
            flexDirection: row,
          }}
        >
          <Ionicons
            name={isAdded ? "checkmark" : "bag-add-outline"}
            size={19}
            color={isAdded ? "#111" : "#fff"}
          />

          <AppText
            weight="bold"
            className={`text-[13px] ml-2 ${
              isAdded ? "text-black" : "text-white"
            }`}
          >
            {isAdded
              ? isRTL
                ? "تمت الإضافة للسلة"
                : "Added to Cart"
              : isRTL
              ? "أضف للسلة"
              : "Add to Cart"}
          </AppText>
        </View>
      </Pressable>

      {/* Navigation Buttons */}

      <View
        className="mt-3 gap-3"
        style={{
          flexDirection: row,
        }}
      >

        {/* Products */}

        <Pressable
          onPress={() => router.push("/products")}
          className="flex-1 h-12 rounded-2xl bg-gray-100 items-center justify-center active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: row,
            }}
          >
            <Ionicons
              name="grid-outline"
              size={17}
              color="#111"
            />

            <AppText
              weight="bold"
              className="text-[11px] text-black ml-2"
            >
              {isRTL
                ? "تصفح المنتجات"
                : "Browse Products"}
            </AppText>
          </View>
        </Pressable>

        {/* Cart */}

        <Pressable
          onPress={() => router.push("/cart")}
          className="flex-1 h-12 rounded-2xl bg-black items-center justify-center active:opacity-80"
        >
          <View
            className="items-center"
            style={{
              flexDirection: row,
            }}
          >
            <Ionicons
              name="bag-outline"
              size={17}
              color="#fff"
            />

            <AppText
              weight="bold"
              className="text-[11px] text-white ml-2"
            >
              {isRTL
                ? "الذهاب للسلة"
                : "Go to Cart"}
            </AppText>
          </View>
        </Pressable>

      </View>

      {/* Product Information */}

      <View className="mt-8 mb-6">

        <AppText
          weight="bold"
          className="text-[15px] text-black mb-3"
        >
          {isRTL
            ? "معلومات المنتج"
            : "Product Information"}
        </AppText>

        <View className="rounded-2xl bg-gray-50 p-4">

          {/* Warranty */}

          <View
            className="py-3 items-center justify-between"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="regular"
              className="text-[11px] text-gray-400"
            >
              {isRTL ? "الضمان" : "Warranty"}
            </AppText>

            <AppText
              weight="medium"
              className="text-[11px] text-black"
            >
              {product.warrantyInformation || "-"}
            </AppText>
          </View>

          <View className="h-[1px] bg-gray-200" />

          {/* Shipping */}

          <View
            className="py-3 items-center justify-between"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="regular"
              className="text-[11px] text-gray-400"
            >
              {isRTL ? "الشحن" : "Shipping"}
            </AppText>

            <AppText
              weight="medium"
              className="text-[11px] text-black"
            >
              {product.shippingInformation || "-"}
            </AppText>
          </View>

          <View className="h-[1px] bg-gray-200" />

          {/* Return Policy */}

          <View
            className="py-3 items-center justify-between"
            style={{
              flexDirection: row,
            }}
          >
            <AppText
              weight="regular"
              className="text-[11px] text-gray-400"
            >
              {isRTL ? "الإرجاع" : "Return Policy"}
            </AppText>

            <AppText
              weight="medium"
              className="text-[11px] text-black"
            >
              {product.returnPolicy || "-"}
            </AppText>
          </View>

        </View>
      </View>

    </View>
  );
}