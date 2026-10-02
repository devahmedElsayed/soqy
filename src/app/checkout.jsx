import { View, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../components/AppText";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function Checkout() {
  const { isRTL, row } = useRTL();

  const {
    cart,
    addresses,
    createOrder,
  } = useShop();

  const defaultAddress =
    addresses.find(
      (item) => item.isDefault
    ) || null;

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10;

  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      router.push("/products");
      return;
    }

    if (!defaultAddress) {
      router.push("/addresses");
      return;
    }

    const newOrder = createOrder();

    if (!newOrder) return;

    router.replace("/order-success");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-1">

        {/* Header */}
        <View className="px-6 pt-5 pb-4">

          <View className="h-10 items-center justify-center">

            <Pressable
              onPress={() => router.back()}
              className={`absolute ${
                isRTL ? "right-0" : "left-0"
              } w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:opacity-70`}
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

            <AppText
              weight="bold"
              className="text-[20px] text-black"
            >
              {isRTL
                ? "إتمام الطلب"
                : "Checkout"}
            </AppText>

          </View>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 40,
          }}
        >

          {/* Shipping Address */}
          <View className="mt-4">

            <View
              className="items-center justify-between mb-3"
              style={{
                flexDirection: row,
              }}
            >

              <AppText
                weight="bold"
                className="text-[15px] text-black"
              >
                {isRTL
                  ? "عنوان الشحن"
                  : "Shipping Address"}
              </AppText>

              <Pressable
                onPress={() =>
                  router.push("/addresses")
                }
                className="active:opacity-60"
              >
                <AppText
                  weight="semibold"
                  className="text-[10px] text-gray-500"
                >
                  {isRTL
                    ? "تغيير"
                    : "Change"}
                </AppText>
              </Pressable>

            </View>

            {defaultAddress ? (

              <View className="p-4 rounded-2xl bg-gray-50">

                <View
                  className="items-center"
                  style={{
                    flexDirection: row,
                  }}
                >

                  <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">

                    <Ionicons
                      name="location-outline"
                      size={19}
                      color="#111"
                    />

                  </View>

                  <View className="flex-1 mx-3">

                    <AppText
                      weight="bold"
                      className="text-[13px] text-black"
                    >
                      {defaultAddress.title}
                    </AppText>

                    <AppText
                      weight="regular"
                      numberOfLines={2}
                      className="text-[11px] text-gray-400 mt-1"
                    >
                      {defaultAddress.address}
                    </AppText>

                  </View>

                  <Ionicons
                    name={
                      isRTL
                        ? "chevron-back"
                        : "chevron-forward"
                    }
                    size={17}
                    color="#aaa"
                  />

                </View>

              </View>

            ) : (

              <Pressable
                onPress={() =>
                  router.push("/addresses")
                }
                className="p-4 rounded-2xl bg-gray-50 active:opacity-70"
              >

                <View
                  className="items-center"
                  style={{
                    flexDirection: row,
                  }}
                >

                  <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">

                    <Ionicons
                      name="add"
                      size={20}
                      color="#111"
                    />

                  </View>

                  <View className="flex-1 mx-3">

                    <AppText
                      weight="bold"
                      className="text-[13px] text-black"
                    >
                      {isRTL
                        ? "إضافة عنوان"
                        : "Add Address"}
                    </AppText>

                    <AppText
                      weight="regular"
                      className="text-[11px] text-gray-400 mt-1"
                    >
                      {isRTL
                        ? "أضف عنوان شحن للمتابعة"
                        : "Add a shipping address to continue"}
                    </AppText>

                  </View>

                  <Ionicons
                    name={
                      isRTL
                        ? "chevron-back"
                        : "chevron-forward"
                    }
                    size={17}
                    color="#aaa"
                  />

                </View>

              </Pressable>

            )}

          </View>

          {/* Payment */}
          <View className="mt-7">

            <AppText
              weight="bold"
              className="text-[15px] text-black mb-3"
            >
              {isRTL
                ? "طريقة الدفع"
                : "Payment Method"}
            </AppText>

            <View className="p-4 rounded-2xl bg-gray-50">

              <View
                className="items-center"
                style={{
                  flexDirection: row,
                }}
              >

                <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">

                  <Ionicons
                    name="cash-outline"
                    size={19}
                    color="#111"
                  />

                </View>

                <View className="flex-1 mx-3">

                  <AppText
                    weight="bold"
                    className="text-[13px] text-black"
                  >
                    {isRTL
                      ? "الدفع عند الاستلام"
                      : "Cash on Delivery"}
                  </AppText>

                  <AppText
                    weight="regular"
                    className="text-[11px] text-gray-400 mt-1"
                  >
                    {isRTL
                      ? "ادفع عند استلام طلبك"
                      : "Pay when you receive your order"}
                  </AppText>

                </View>

                <Ionicons
                  name="checkmark-circle"
                  size={21}
                  color="#111"
                />

              </View>

            </View>

          </View>

          {/* Products */}
          <View className="mt-7">

            <View
              className="items-center justify-between mb-3"
              style={{
                flexDirection: row,
              }}
            >

              <AppText
                weight="bold"
                className="text-[15px] text-black"
              >
                {isRTL
                  ? "المنتجات"
                  : "Products"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400"
              >
                {cart.length}{" "}
                {isRTL
                  ? "منتجات"
                  : "items"}
              </AppText>

            </View>

            {cart.map((item) => (

              <View
                key={item.id}
                className="mb-3 p-3 rounded-2xl bg-gray-50"
              >

                <View
                  className="items-center"
                  style={{
                    flexDirection: row,
                  }}
                >

                  <Image
                    source={{
                      uri:
                        item.thumbnail ||
                        item.images?.[0],
                    }}
                    className="w-16 h-16 rounded-xl bg-white"
                    resizeMode="cover"
                  />

                  <View className="flex-1 mx-3">

                    <AppText
                      weight="semibold"
                      numberOfLines={1}
                      className="text-[12px] text-black"
                    >
                      {item.title}
                    </AppText>

                    <AppText
                      weight="regular"
                      className="text-[10px] text-gray-400 mt-1"
                    >
                      {isRTL
                        ? `الكمية: ${item.quantity}`
                        : `Quantity: ${item.quantity}`}
                    </AppText>

                  </View>

                  <AppText
                    weight="bold"
                    className="text-[13px] text-black"
                  >
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </AppText>

                </View>

              </View>

            ))}

          </View>

          {/* Summary */}
          <View className="mt-4 p-4 rounded-2xl bg-gray-50">

            <AppText
              weight="bold"
              className="text-[15px] text-black mb-4"
            >
              {isRTL
                ? "ملخص الطلب"
                : "Order Summary"}
            </AppText>

            <View
              className="items-center justify-between mb-3"
              style={{
                flexDirection: row,
              }}
            >

              <AppText className="text-[11px] text-gray-400">
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

            <View
              className="items-center justify-between mb-3"
              style={{
                flexDirection: row,
              }}
            >

              <AppText className="text-[11px] text-gray-400">
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

            <View className="h-[1px] bg-gray-200 mb-3" />

            <View
              className="items-center justify-between"
              style={{
                flexDirection: row,
              }}
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

          </View>

          {/* Place Order */}
          <Pressable
            onPress={handlePlaceOrder}
            className="mt-6 h-14 rounded-2xl bg-black items-center justify-center active:opacity-80"
          >

            <View
              className="items-center"
              style={{
                flexDirection: row,
              }}
            >

              <Ionicons
                name="checkmark-circle-outline"
                size={19}
                color="#fff"
              />

              <AppText
                weight="bold"
                className="text-white text-[13px] ml-2"
              >
                {isRTL
                  ? "تأكيد الطلب"
                  : "Place Order"}
              </AppText>

            </View>

          </Pressable>

        </ScrollView>

      </View>

    </SafeAreaView>
  );
}