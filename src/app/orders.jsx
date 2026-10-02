import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../components/AppText";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function Orders() {
  const { isRTL } = useRTL();

  const { orders } = useShop();

  const getStatusText = (status) => {
    if (status === "pending") {
      return isRTL ? "قيد التنفيذ" : "Pending";
    }

    if (status === "delivered") {
      return isRTL ? "تم التوصيل" : "Delivered";
    }

    if (status === "cancelled") {
      return isRTL ? "ملغي" : "Cancelled";
    }

    return status;
  };

  const getStatusStyle = (status) => {
    if (status === "pending") {
      return "bg-yellow-100";
    }

    if (status === "delivered") {
      return "bg-green-100";
    }

    return "bg-red-100";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      isRTL ? "ar-SA" : "en-US",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
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
              } w-10 h-10 rounded-full bg-gray-100 items-center justify-center`}
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
              {isRTL ? "طلباتي" : "My Orders"}
            </AppText>

          </View>

        </View>

        {/* Empty */}
        {orders.length === 0 ? (

          <View className="flex-1 items-center justify-center px-6">

            <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center">
              <Ionicons
                name="receipt-outline"
                size={32}
                color="#999"
              />
            </View>

            <AppText
              weight="bold"
              className="text-[18px] text-black mt-5"
            >
              {isRTL
                ? "مفيش طلبات"
                : "No Orders Yet"}
            </AppText>

            <AppText
              weight="regular"
              className="text-[11px] text-gray-400 mt-2 text-center"
            >
              {isRTL
                ? "لما تعمل طلب هتلاقيه هنا"
                : "Your orders will appear here"}
            </AppText>

            <Pressable
              onPress={() => router.push("/products")}
              className="mt-6 h-11 px-7 rounded-xl bg-black items-center justify-center"
            >
              <AppText
                weight="bold"
                className="text-white text-[12px]"
              >
                {isRTL
                  ? "تصفح المنتجات"
                  : "Browse Products"}
              </AppText>
            </Pressable>

          </View>

        ) : (

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 40,
            }}
          >

            {orders.map((order) => {

              const itemsCount = order.items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              );

              return (
                <Pressable
                  key={order.id}
                  onPress={() =>
                    router.push({
                      pathname: "/order/[id]",
                      params: {
                        id: String(order.id),
                      },
                    })
                  }
                  className="mb-4 p-4 rounded-2xl bg-gray-50 active:opacity-70"
                >

                  {/* Header */}
                  <View
                    className="items-center justify-between"
                    style={{
                      flexDirection: isRTL
                        ? "row-reverse"
                        : "row",
                    }}
                  >

                    <View>

                      <AppText
                        weight="bold"
                        className="text-[15px] text-black"
                      >
                        #{order.id}
                      </AppText>

                      <AppText
                        weight="regular"
                        className="text-[10px] text-gray-400 mt-1"
                      >
                        {formatDate(order.date)}
                      </AppText>

                    </View>

                    <View
                      className={`px-3 py-1.5 rounded-full ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      <AppText
                        weight="semibold"
                        className="text-[10px] text-black"
                      >
                        {getStatusText(
                          order.status
                        )}
                      </AppText>
                    </View>

                  </View>

                  <View className="h-[1px] bg-gray-200 my-4" />

                  {/* Bottom */}
                  <View
                    className="items-center justify-between"
                    style={{
                      flexDirection: isRTL
                        ? "row-reverse"
                        : "row",
                    }}
                  >

                    <AppText
                      weight="regular"
                      className="text-[11px] text-gray-500"
                    >
                      {isRTL
                        ? `${itemsCount} منتجات`
                        : `${itemsCount} products`}
                    </AppText>

                    <AppText
                      weight="bold"
                      className="text-[15px] text-black"
                    >
                      ${order.total.toFixed(2)}
                    </AppText>

                  </View>

                </Pressable>
              );
            })}

          </ScrollView>
        )}

      </View>
    </SafeAreaView>
  );
}