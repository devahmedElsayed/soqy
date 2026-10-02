import { View, Pressable, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import BottomNav from "../components/BottomNav";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function Cart() {
  const { isRTL, row } = useRTL();

  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useShop();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10;

  const total = subtotal + shipping;

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top"]}
    >
      {/* Header */}
      <View
        className="px-6 pt-5 pb-4 items-center justify-between"
        style={{ flexDirection: row }}
      >
        <View>
          <AppText
            weight="bold"
            className="text-[26px] text-black"
          >
            {isRTL ? "السلة" : "Cart"}
          </AppText>

          <AppText
            weight="regular"
            className="text-[11px] text-gray-400 mt-1"
          >
            {cart.length}{" "}
            {isRTL ? "منتجات" : "items"}
          </AppText>
        </View>

        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:opacity-70"
        >
          <Ionicons
            name={
              isRTL
                ? "arrow-forward"
                : "arrow-back"
            }
            size={19}
            color="#111"
          />
        </Pressable>
      </View>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">

          <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons
              name="bag-outline"
              size={32}
              color="#999"
            />
          </View>

          <AppText
            weight="bold"
            className="text-[19px] text-black mt-5"
          >
            {isRTL
              ? "السلة فاضية"
              : "Your cart is empty"}
          </AppText>

          <AppText
            weight="regular"
            className="text-[11px] text-gray-400 mt-2 text-center"
          >
            {isRTL
              ? "ابدأ بإضافة منتجات للسلة"
              : "Start adding products to your cart"}
          </AppText>

          <Pressable
            onPress={() => router.push("/products")}
            className="mt-5 h-11 px-7 rounded-xl bg-black items-center justify-center active:opacity-80"
          >
            <AppText
              weight="semibold"
              className="text-white text-[11px]"
            >
              {isRTL
                ? "تصفح المنتجات"
                : "Browse Products"}
            </AppText>
          </Pressable>

        </View>
      ) : (
        <>
          {/* Cart Items */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 240,
            }}
          >
            {cart.map((item) => (
              <View
                key={item.id}
                className="mb-4 p-3 rounded-2xl bg-gray-50"
              >

                {/* Product */}
                <View
                  className="items-center"
                  style={{ flexDirection: row }}
                >

                  {/* Image */}
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/product/[id]",
                        params: {
                          id: item.id,
                        },
                      })
                    }
                  >
                    <View className="w-[82px] h-[82px] rounded-xl bg-white overflow-hidden">
                      <Image
                        source={{
                          uri:
                            item.thumbnail ||
                            item.images?.[0],
                        }}
                        className="w-full h-full"
                        resizeMode="cover"
                      />
                    </View>
                  </Pressable>

                  {/* Info */}
                  <View className="flex-1 mx-3">

                    <AppText
                      weight="semibold"
                      numberOfLines={2}
                      className="text-[13px] text-black"
                    >
                      {item.title}
                    </AppText>

                    <AppText
                      weight="regular"
                      numberOfLines={1}
                      className="text-[10px] text-gray-400 mt-1"
                    >
                      {item.brand ||
                        item.category}
                    </AppText>

                    <AppText
                      weight="bold"
                      className="text-[14px] text-black mt-2"
                    >
                      ${item.price}
                    </AppText>

                  </View>

                  {/* Delete */}
                  <Pressable
                    onPress={() =>
                      removeFromCart(item.id)
                    }
                    className="w-8 h-8 rounded-full bg-white items-center justify-center active:opacity-60"
                  >
                    <Ionicons
                      name="trash-outline"
                      size={15}
                      color="#777"
                    />
                  </Pressable>

                </View>

                {/* Quantity */}
                <View
                  className="mt-3 h-10 rounded-xl bg-white px-2 items-center justify-between"
                  style={{ flexDirection: row }}
                >

                  <Pressable
                    onPress={() =>
                      updateQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    disabled={
                      item.quantity === 1
                    }
                    className="w-7 h-7 rounded-lg bg-gray-100 items-center justify-center active:opacity-60"
                  >
                    <Ionicons
                      name="remove"
                      size={14}
                      color={
                        item.quantity === 1
                          ? "#ccc"
                          : "#111"
                      }
                    />
                  </Pressable>

                  <AppText
                    weight="bold"
                    className="text-[12px] text-black"
                  >
                    {item.quantity}
                  </AppText>

                  <Pressable
                    onPress={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    disabled={
                      item.quantity >=
                      item.stock
                    }
                    className="w-7 h-7 rounded-lg bg-gray-100 items-center justify-center active:opacity-60"
                  >
                    <Ionicons
                      name="add"
                      size={14}
                      color={
                        item.quantity >=
                        item.stock
                          ? "#ccc"
                          : "#111"
                      }
                    />
                  </Pressable>

                </View>

              </View>
            ))}
          </ScrollView>

          {/* Order Summary */}
          <View className="absolute bottom-[72px] left-0 right-0 bg-white border-t border-gray-100 px-6 pt-4 pb-4">

            {/* Subtotal */}
            <View
              className="items-center justify-between mb-2"
              style={{ flexDirection: row }}
            >
              <AppText
                weight="regular"
                className="text-[11px] text-gray-400"
              >
                {isRTL
                  ? "المجموع الفرعي"
                  : "Subtotal"}
              </AppText>

              <AppText
                weight="semibold"
                className="text-[12px] text-black"
              >
                ${subtotal.toFixed(2)}
              </AppText>
            </View>

            {/* Shipping */}
            <View
              className="items-center justify-between mb-3"
              style={{ flexDirection: row }}
            >
              <AppText
                weight="regular"
                className="text-[11px] text-gray-400"
              >
                {isRTL
                  ? "الشحن"
                  : "Shipping"}
              </AppText>

              <AppText
                weight="semibold"
                className="text-[12px] text-black"
              >
                {shipping === 0
                  ? isRTL
                    ? "مجاني"
                    : "Free"
                  : `$${shipping.toFixed(2)}`}
              </AppText>
            </View>

            <View className="h-[1px] bg-gray-100 mb-3" />

            {/* Total */}
            <View
              className="items-center justify-between mb-4"
              style={{ flexDirection: row }}
            >
              <AppText
                weight="bold"
                className="text-[15px] text-black"
              >
                {isRTL
                  ? "الإجمالي"
                  : "Total"}
              </AppText>

              <AppText
                weight="bold"
                className="text-[18px] text-black"
              >
                ${total.toFixed(2)}
              </AppText>
            </View>

            {/* Checkout */}
            <Pressable
              onPress={() =>
                router.push("/checkout")
              }
              className="h-13 rounded-2xl bg-black items-center justify-center active:opacity-80"
            >
              <AppText
                weight="bold"
                className="text-white text-[12px]"
              >
                {isRTL
                  ? "إتمام الشراء"
                  : "Checkout"}
              </AppText>
            </Pressable>

          </View>
        </>
      )}

      {/* Bottom Navigation */}
      <BottomNav />

    </SafeAreaView>
  );
}