import { View, Pressable, ScrollView, Image } from "react-native";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function Categories({ products = [] }) {
  const { isRTL, row } = useRTL();

  const categories = [
    {
      key: "beauty",
      title: isRTL ? "الجمال" : "Beauty",
    },
    {
      key: "fragrances",
      title: isRTL ? "العطور" : "Fragrances",
    },
    {
      key: "furniture",
      title: isRTL ? "الأثاث" : "Furniture",
    },
    {
      key: "groceries",
      title: isRTL ? "البقالة" : "Groceries",
    },
  ];

  const getCategoryImage = (category) => {
    const product = products.find(
      (item) => item.category === category
    );

    return (
      product?.thumbnail ||
      product?.images?.[0]
    );
  };

  const handleCategoryPress = (category) => {
    router.push({
      pathname: "/products",
      params: {
        category: category.key,
      },
    });
  };

  return (
    <View className="mt-9">

      {/* Section Header */}
      <View
        className="px-6 items-center justify-between"
        style={{
          flexDirection: row,
        }}
      >
        <AppText
          weight="bold"
          className="text-[21px] text-black"
        >
          {isRTL
            ? "تسوق حسب الفئة"
            : "Shop by category"}
        </AppText>

        <Pressable
          onPress={() => router.push("/products")}
          className="active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-[12px] text-gray-500"
          >
            {isRTL
              ? "عرض الكل"
              : "View all"}
          </AppText>
        </Pressable>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          gap: 18,
          marginTop: 18,
        }}
      >
        {categories.map((category) => {
          const image = getCategoryImage(
            category.key
          );

          return (
            <Pressable
              key={category.key}
              onPress={() =>
                handleCategoryPress(category)
              }
              className="items-center active:opacity-70"
            >

              {/* Image */}
              <View className="w-[78px] h-[78px] rounded-full overflow-hidden bg-[#F3F3F1]">
                {image && (
                  <Image
                    source={{
                      uri: image,
                    }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )}
              </View>

              {/* Name */}
              <AppText
                weight="semibold"
                className="text-black text-[12px] mt-3"
              >
                {category.title}
              </AppText>

            </Pressable>
          );
        })}
      </ScrollView>

    </View>
  );
}