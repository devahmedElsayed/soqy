import { ScrollView, Pressable } from "react-native";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProductsCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  const { isRTL } = useRTL();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
      className="mt-4 pb-2"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <Pressable
            key={category}
            onPress={() => setSelectedCategory(category)}
            className={`mr-2 px-5 h-9 rounded-full items-center justify-center ${
              isActive ? "bg-black" : "bg-gray-100"
            }`}
          >
            <AppText
              weight={isActive ? "semibold" : "medium"}
              className={`text-[10px] ${
                isActive ? "text-white" : "text-gray-500"
              }`}
            >
              {category === "all"
                ? isRTL
                  ? "الكل"
                  : "All"
                : category}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}