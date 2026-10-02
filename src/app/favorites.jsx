import { View, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";

import AppText from "../components/AppText";
import ProductCard from "../components/Products/ProductCard";
import BottomNav from "../components/BottomNav";
import useRTL from "../hooks/useRTL";

import { useShop } from "../context/ShopContext";

export default function Favorites() {
  const { favorites } = useShop();

  const { isRTL, row, textAlign } = useRTL();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top"]}
    >
      {/* Header */}

      <View
        className="px-6 py-4 items-center justify-between"
        style={{
          flexDirection: row,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={19}
            color="#111"
          />
        </Pressable>

        <AppText
          weight="bold"
          className="text-[18px] text-black"
        >
          {isRTL ? "المفضلة" : "Favorites"}
        </AppText>

        <View className="w-10" />
      </View>

      {/* Favorites */}

      {favorites.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">

          <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons
              name="heart-outline"
              size={34}
              color="#111"
            />
          </View>

          <AppText
            weight="bold"
            className="text-[17px] text-black mt-5"
          >
            {isRTL
              ? "المفضلة فارغة"
              : "Your favorites are empty"}
          </AppText>

          <AppText
            weight="regular"
            className="text-[12px] text-gray-400 mt-2 text-center"
          >
            {isRTL
              ? "أضف المنتجات التي تحبها إلى المفضلة"
              : "Add products you love to your favorites"}
          </AppText>

          <Pressable
            onPress={() => router.push("/products")}
            className="mt-6 h-11 px-7 rounded-xl bg-black items-center justify-center"
          >
            <AppText
              weight="bold"
              className="text-white text-[12px]"
            >
              {isRTL ? "تصفح المنتجات" : "Browse Products"}
            </AppText>
          </Pressable>

        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 24,
          }}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
        />
      )}

      {/* Bottom Navigation */}

      <BottomNav />
    </SafeAreaView>
  );
}