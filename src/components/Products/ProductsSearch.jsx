import { View, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import useRTL from "../../hooks/useRTL";

export default function ProductsSearch({
  searchQuery,
  setSearchQuery,
}) {
  const { isRTL, row, textAlign, writingDirection } = useRTL();

  return (
    <View
      className="mx-6 h-[52px] rounded-2xl bg-gray-100 px-4 items-center"
      style={{ flexDirection: row }}
    >
      <Ionicons name="search-outline" size={20} color="#777" />

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder={
          isRTL
            ? "ابحث عن منتج أو براند..."
            : "Search products or brands..."
        }
        placeholderTextColor="#999"
        className="flex-1 text-black text-[13px] px-3"
        style={{
          textAlign,
          writingDirection,
        }}
      />

      {searchQuery.length > 0 && (
        <Pressable
          onPress={() => setSearchQuery("")}
          className="w-7 h-7 rounded-full bg-gray-200 items-center justify-center"
        >
          <Ionicons name="close" size={15} color="#555" />
        </Pressable>
      )}
    </View>
  );
}