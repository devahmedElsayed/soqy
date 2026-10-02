import { View, Pressable, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProductsFilter({
  visible,
  setVisible,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  resetFilters,
}) {
  const { isRTL, row, textAlign } = useRTL();
  const insets = useSafeAreaInsets();

  const sortOptions = [
    {
      value: "default",
      ar: "الأحدث",
      en: "Default",
      icon: "sparkles-outline",
    },
    {
      value: "low",
      ar: "الأقل سعراً",
      en: "Price Low",
      icon: "arrow-down-outline",
    },
    {
      value: "high",
      ar: "الأعلى سعراً",
      en: "Price High",
      icon: "arrow-up-outline",
    },
    {
      value: "rating",
      ar: "الأعلى تقييماً",
      en: "Top Rated",
      icon: "star-outline",
    },
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => setVisible(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">

        {/* Bottom Sheet */}
        <View
          className="bg-white rounded-t-[32px]"
          style={{
            paddingBottom: insets.bottom,
          }}
        >

          {/* Handle */}
          <View className="items-center pt-3">
            <View className="w-10 h-1 rounded-full bg-gray-300" />
          </View>

          {/* Header */}
          <View
            className="px-6 pt-5 pb-4 items-center justify-between"
            style={{ flexDirection: row }}
          >
            <View>
              <AppText
                weight="bold"
                className="text-[21px] text-black"
              >
                {isRTL ? "فلترة المنتجات" : "Filter Products"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[11px] text-gray-400 mt-1"
              >
                {isRTL
                  ? "حدد الخيارات المناسبة لك"
                  : "Choose what works for you"}
              </AppText>
            </View>

            <Pressable
              onPress={() => setVisible(false)}
              className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:opacity-60"
            >
              <Ionicons
                name="close"
                size={19}
                color="#111"
              />
            </Pressable>
          </View>

          {/* Divider */}
          <View className="h-[1px] bg-gray-100" />

          {/* Content */}
          <View className="px-6">

            {/* Price */}
            <View className="mt-5">

              <View
                className="items-center justify-between mb-3"
                style={{ flexDirection: row }}
              >
                <AppText
                  weight="bold"
                  className="text-[14px] text-black"
                >
                  {isRTL ? "السعر" : "Price"}
                </AppText>

                <AppText
                  weight="medium"
                  className="text-[10px] text-gray-400"
                >
                  {isRTL ? "بالدولار" : "USD"}
                </AppText>
              </View>

              <View
                className="items-center"
                style={{ flexDirection: row }}
              >
                <View className="flex-1">

                  <AppText
                    weight="medium"
                    className="text-[10px] text-gray-400 mb-2"
                  >
                    {isRTL ? "من" : "Min"}
                  </AppText>

                  <View
                    className="h-12 rounded-xl bg-gray-100 px-4 items-center"
                    style={{ flexDirection: row }}
                  >
                    <AppText
                      weight="bold"
                      className="text-[13px] text-gray-400"
                    >
                      $
                    </AppText>

                    <TextInput
                      value={minPrice}
                      onChangeText={setMinPrice}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#aaa"
                      className="flex-1 text-black text-[13px] ml-2"
                      style={{ textAlign }}
                    />
                  </View>

                </View>

                <View className="w-4" />

                <View className="flex-1">

                  <AppText
                    weight="medium"
                    className="text-[10px] text-gray-400 mb-2"
                  >
                    {isRTL ? "إلى" : "Max"}
                  </AppText>

                  <View
                    className="h-12 rounded-xl bg-gray-100 px-4 items-center"
                    style={{ flexDirection: row }}
                  >
                    <AppText
                      weight="bold"
                      className="text-[13px] text-gray-400"
                    >
                      $
                    </AppText>

                    <TextInput
                      value={maxPrice}
                      onChangeText={setMaxPrice}
                      keyboardType="numeric"
                      placeholder="1000"
                      placeholderTextColor="#aaa"
                      className="flex-1 text-black text-[13px] ml-2"
                      style={{ textAlign }}
                    />
                  </View>

                </View>
              </View>

            </View>

            {/* Rating */}
            <View className="mt-6">

              <AppText
                weight="bold"
                className="text-[14px] text-black mb-3"
              >
                {isRTL ? "التقييم" : "Rating"}
              </AppText>

              <View
                className="items-center"
                style={{
                  flexDirection: isRTL
                    ? "row-reverse"
                    : "row",
                }}
              >
                {ratings.map((rating) => {
                  const active = selectedRating === rating;

                  return (
                    <Pressable
                      key={rating}
                      onPress={() =>
                        setSelectedRating(
                          active ? 0 : rating
                        )
                      }
                      className={`mr-2 px-4 h-10 rounded-xl flex-row items-center justify-center ${
                        active
                          ? "bg-black"
                          : "bg-gray-100"
                      }`}
                    >
                      <Ionicons
                        name="star"
                        size={13}
                        color={active ? "#fff" : "#111"}
                      />

                      <AppText
                        weight="semibold"
                        className={`text-[11px] ml-1 ${
                          active
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {rating}+
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>

            </View>

            {/* Sort */}
            <View className="mt-6">

              <AppText
                weight="bold"
                className="text-[14px] text-black mb-3"
              >
                {isRTL ? "ترتيب حسب" : "Sort By"}
              </AppText>

              <View
                className="flex-row flex-wrap"
                style={{
                  flexDirection: isRTL
                    ? "row-reverse"
                    : "row",
                }}
              >
                {sortOptions.map((option) => {
                  const active = sortBy === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      onPress={() =>
                        setSortBy(option.value)
                      }
                      className={`w-[48%] h-11 rounded-xl mb-2 mr-[2%] px-3 items-center ${
                        active
                          ? "bg-black"
                          : "bg-gray-100"
                      }`}
                      style={{
                        flexDirection: row,
                      }}
                    >
                      <View
                        className={`w-7 h-7 rounded-lg items-center justify-center ${
                          active
                            ? "bg-white/15"
                            : "bg-white"
                        }`}
                      >
                        <Ionicons
                          name={option.icon}
                          size={14}
                          color={
                            active ? "#fff" : "#555"
                          }
                        />
                      </View>

                      <AppText
                        weight="semibold"
                        className={`text-[10px] ml-2 ${
                          active
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {isRTL
                          ? option.ar
                          : option.en}
                      </AppText>
                    </Pressable>
                  );
                })}
              </View>

            </View>

            {/* Buttons */}
            <View
              className="mt-5"
              style={{ flexDirection: row }}
            >

              <Pressable
                onPress={resetFilters}
                className="h-12 px-6 rounded-xl bg-gray-100 items-center justify-center"
              >
                <AppText
                  weight="semibold"
                  className="text-black text-[11px]"
                >
                  {isRTL ? "مسح" : "Clear"}
                </AppText>
              </Pressable>

              <Pressable
                onPress={() => setVisible(false)}
                className="flex-1 h-12 rounded-xl bg-black items-center justify-center ml-3 active:opacity-80"
              >
                <AppText
                  weight="bold"
                  className="text-white text-[12px]"
                >
                  {isRTL
                    ? "عرض المنتجات"
                    : "Show Products"}
                </AppText>
              </Pressable>

            </View>

          </View>

          {/* Bottom Safe Area Space */}
          <View style={{ height: 8 }} />

        </View>
      </View>
    </Modal>
  );
}