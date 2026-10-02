import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../components/AppText";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function OrderSuccess() {
  const { isRTL } = useRTL();
  const { lastOrder } = useShop();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6">

        {/* Success Icon */}
        <View className="w-24 h-24 rounded-full bg-green-100 items-center justify-center">
          <Ionicons
            name="checkmark"
            size={50}
            color="green"
          />
        </View>

        {/* Title */}
        <AppText
          weight="bold"
          className="text-[24px] text-black mt-6"
        >
          {isRTL
            ? "تم الطلب بنجاح"
            : "Order Placed"}
        </AppText>

        {/* Message */}
        <AppText
          weight="regular"
          className="text-gray-500 text-center mt-3"
        >
          {isRTL
            ? "شكراً لك، تم استلام طلبك بنجاح."
            : "Thank you, your order has been placed successfully."}
        </AppText>

        {/* Order Number */}
        {lastOrder && (
          <View className="mt-6 px-6 py-4 rounded-2xl bg-gray-50 items-center w-full">

            <AppText
              weight="regular"
              className="text-[11px] text-gray-400"
            >
              {isRTL
                ? "رقم الطلب"
                : "Order Number"}
            </AppText>

            <AppText
              weight="bold"
              className="text-[18px] text-black mt-1"
            >
              {lastOrder.id}
            </AppText>

          </View>
        )}

        {/* Continue Shopping */}
        <Pressable
          onPress={() => router.replace("/")}
          className="mt-8 h-14 w-full rounded-2xl bg-black items-center justify-center active:opacity-80"
        >
          <AppText
            weight="bold"
            className="text-white"
          >
            {isRTL
              ? "متابعة التسوق"
              : "Continue Shopping"}
          </AppText>
        </Pressable>

        {/* View Orders */}
        <Pressable
          onPress={() => router.push("/orders")}
          className="mt-4 h-14 w-full rounded-2xl bg-gray-100 items-center justify-center active:opacity-70"
        >
          <AppText
            weight="bold"
            className="text-black"
          >
            {isRTL
              ? "عرض الطلبات"
              : "View Orders"}
          </AppText>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}