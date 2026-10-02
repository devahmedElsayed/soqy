import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";
import { useShop } from "../../context/ShopContext";

export default function ProfileMenu() {
  const { isRTL } = useRTL();

  const {
    cart,
    favorites,
  } = useShop();

  return (
    <View className="px-6 mt-8">

      {/* Section Title */}
      <View
        className="mb-3"
        style={{
          alignItems: isRTL ? "flex-end" : "flex-start",
        }}
      >
        <AppText
          weight="bold"
          className="text-[15px] text-black"
        >
          {isRTL ? "حسابك" : "Your Account"}
        </AppText>
      </View>

      <View className="rounded-2xl bg-gray-50 overflow-hidden">

        {/* Orders */}
        <Pressable
          onPress={() => router.push("/orders")}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="receipt-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL ? 0 : 12,
                marginRight: isRTL ? 12 : 0,
                alignItems: isRTL ? "flex-end" : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL ? "طلباتي" : "My Orders"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "عرض طلباتك"
                  : "View your orders"}
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

        <View className="h-[1px] bg-gray-200 mx-4" />

        {/* Addresses */}
        <Pressable
          onPress={() => router.push("/addresses")}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="location-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL ? 0 : 12,
                marginRight: isRTL ? 12 : 0,
                alignItems: isRTL ? "flex-end" : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "عناويني"
                  : "My Addresses"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "إدارة عناوين الشحن"
                  : "Manage shipping addresses"}
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

        <View className="h-[1px] bg-gray-200 mx-4" />

        {/* Favorites */}
        <Pressable
          onPress={() => router.push("/favorites")}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="heart-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL ? 0 : 12,
                marginRight: isRTL ? 12 : 0,
                alignItems: isRTL ? "flex-end" : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "المفضلة"
                  : "Favorites"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? `${favorites.length} منتجات`
                  : `${favorites.length} products`}
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

        <View className="h-[1px] bg-gray-200 mx-4" />

        {/* Cart */}
        <Pressable
          onPress={() => router.push("/cart")}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="bag-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL ? 0 : 12,
                marginRight: isRTL ? 12 : 0,
                alignItems: isRTL ? "flex-end" : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL ? "السلة" : "Cart"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL ? "right" : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? `${cart.length} منتجات`
                  : `${cart.length} products`}
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

      </View>
    </View>
  );
}