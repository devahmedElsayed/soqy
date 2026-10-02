import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

import AppText from "./AppText";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { isRTL } = useRTL();

  const { cart } = useShop();

  // إجمالي عدد المنتجات في السلة
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const tabs = [
    {
      name: isRTL ? "الرئيسية" : "Home",
      icon: "home-outline",
      activeIcon: "home",
      path: "/",
    },
    {
      name: isRTL ? "المنتجات" : "Products",
      icon: "grid-outline",
      activeIcon: "grid",
      path: "/products",
    },
    {
      name: isRTL ? "السلة" : "Cart",
      icon: "bag-outline",
      activeIcon: "bag",
      path: "/cart",
    },
    {
      name: isRTL ? "حسابي" : "Profile",
      icon: "person-outline",
      activeIcon: "person",
      path: "/profile",
    },
  ];

  return (
    <View
      className="h-[72px] bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View
        className="flex-1 items-center justify-around px-5"
        style={{
          flexDirection: isRTL
            ? "row-reverse"
            : "row",
        }}
      >
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.path;

          const isCart =
            tab.path === "/cart";

          return (
            <Pressable
              key={tab.path}
              onPress={() =>
                router.push(tab.path)
              }
              className="flex-1 items-center justify-center h-full active:opacity-60"
            >
              <View className="relative">

                {/* Icon */}
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    isActive
                      ? "bg-black"
                      : "bg-transparent"
                  }`}
                >
                  <Ionicons
                    name={
                      isActive
                        ? tab.activeIcon
                        : tab.icon
                    }
                    size={20}
                    color={
                      isActive
                        ? "#fff"
                        : "#999"
                    }
                  />
                </View>

                {/* Cart Badge */}
                {isCart &&
                  cartCount > 0 && (
                    <View
                      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-black border-2 border-white items-center justify-center"
                    >
                      <AppText
                        weight="bold"
                        className="text-white text-[8px]"
                      >
                        {cartCount > 99
                          ? "99+"
                          : cartCount}
                      </AppText>
                    </View>
                  )}

              </View>

              {/* Label */}
              <AppText
                weight={
                  isActive
                    ? "semibold"
                    : "regular"
                }
                className={`text-[10px] mt-1 ${
                  isActive
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                {tab.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}