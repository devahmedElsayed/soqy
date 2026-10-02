import {
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  router,
  useLocalSearchParams,
} from "expo-router";

import AppText from "../../components/AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function OrderDetails() {
  const { isRTL, row } = useRTL();

  const { id } = useLocalSearchParams();

  const { orders } = useShop();

  const order = orders.find(
    (item) =>
      String(item.id) === String(id)
  );

  // =========================
  // Status
  // =========================

  const getStatusText = (status) => {
    if (status === "pending") {
      return isRTL
        ? "قيد التنفيذ"
        : "Pending";
    }

    if (status === "delivered") {
      return isRTL
        ? "تم التوصيل"
        : "Delivered";
    }

    if (status === "cancelled") {
      return isRTL
        ? "ملغي"
        : "Cancelled";
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

  // =========================
  // Date
  // =========================

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

  // =========================
  // Order Not Found
  // =========================

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-white">

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
              ? "الطلب غير موجود"
              : "Order Not Found"}
          </AppText>

          <Pressable
            onPress={() => router.back()}
            className="mt-6 h-11 px-7 rounded-xl bg-black items-center justify-center"
          >
            <AppText
              weight="bold"
              className="text-white text-[12px]"
            >
              {isRTL
                ? "رجوع"
                : "Go Back"}
            </AppText>
          </Pressable>

        </View>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-1">

        {/* =========================
            Header
        ========================= */}

        <View className="px-6 pt-5 pb-4">

          <View className="h-10 items-center justify-center">

            <Pressable
              onPress={() => router.back()}
              className={`absolute ${
                isRTL
                  ? "right-0"
                  : "left-0"
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
                ? "تفاصيل الطلب"
                : "Order Details"}
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

          {/* =========================
              Order Info
          ========================= */}

          <View className="p-4 rounded-2xl bg-gray-50">

            <View
              className="items-center justify-between"
              style={{
                flexDirection: row,
              }}
            >

              <View>

                <AppText
                  weight="bold"
                  className="text-[16px] text-black"
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

          </View>

          {/* =========================
              Products
          ========================= */}

          <View className="mt-7">

            <AppText
              weight="bold"
              className="text-[15px] text-black mb-3"
            >
              {isRTL
                ? "المنتجات"
                : "Products"}
            </AppText>

            {order.items.map((item) => (

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

                  <View className="w-20 h-20 rounded-xl bg-white overflow-hidden">

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

                  <View className="flex-1 mx-3">

                    <AppText
                      weight="semibold"
                      numberOfLines={2}
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

                    <AppText
                      weight="bold"
                      className="text-[12px] text-black mt-2"
                    >
                      ${item.price.toFixed(2)}
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

          {/* =========================
              Order Summary
          ========================= */}

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
                $
                {order.subtotal.toFixed(2)}
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
                {order.shipping === 0
                  ? isRTL
                    ? "مجاني"
                    : "Free"
                  : `$${order.shipping.toFixed(
                      2
                    )}`}
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
                ${order.total.toFixed(2)}
              </AppText>

            </View>

          </View>

          {/* =========================
              Payment
          ========================= */}

          <View className="mt-4 p-4 rounded-2xl bg-gray-50">

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
                  className="text-[12px] text-black"
                >
                  {isRTL
                    ? "الدفع عند الاستلام"
                    : "Cash on Delivery"}
                </AppText>

                <AppText
                  weight="regular"
                  className="text-[10px] text-gray-400 mt-1"
                >
                  {isRTL
                    ? "طريقة الدفع"
                    : "Payment Method"}
                </AppText>

              </View>

            </View>

          </View>

          {/* =========================
              Shipping Address
          ========================= */}

          <View className="mt-4 p-4 rounded-2xl bg-gray-50">

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
                  className="text-[12px] text-black"
                >
                  {order.address?.title ||
                    (isRTL
                      ? "عنوان الشحن"
                      : "Shipping Address")}
                </AppText>

                <AppText
                  weight="regular"
                  numberOfLines={2}
                  className="text-[10px] text-gray-400 mt-1"
                >
                  {order.address?.address ||
                    (isRTL
                      ? "لا يوجد عنوان"
                      : "No address")}
                </AppText>

              </View>

            </View>

          </View>

        </ScrollView>

      </View>

    </SafeAreaView>
  );
}