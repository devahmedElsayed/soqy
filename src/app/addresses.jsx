import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../components/AppText";
import useRTL from "../hooks/useRTL";
import { useShop } from "../context/ShopContext";

export default function Addresses() {
  const { isRTL, row } = useRTL();

  const {
    addresses,
    addAddress,
    deleteAddress,
    setDefaultAddress,
  } = useShop();

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");

  const handleAddAddress = () => {
    if (!title.trim() || !address.trim()) {
      return;
    }

    addAddress(title, address);

    setTitle("");
    setAddress("");
    setShowForm(false);
  };

  const handleDeleteAddress = (id) => {
    deleteAddress(id);
  };

  const handleSetDefault = (id) => {
    setDefaultAddress(id);
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
                ? "عناويني"
                : "My Addresses"}
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

          {/* Add Address Button */}
          <Pressable
            onPress={() =>
              setShowForm(!showForm)
            }
            className="h-12 rounded-2xl bg-black items-center justify-center active:opacity-80"
          >
            <View
              className="items-center"
              style={{
                flexDirection: row,
              }}
            >

              <Ionicons
                name={
                  showForm
                    ? "close"
                    : "add"
                }
                size={19}
                color="#fff"
              />

              <AppText
                weight="bold"
                className="text-white text-[12px] ml-2"
              >
                {showForm
                  ? isRTL
                    ? "إلغاء"
                    : "Cancel"
                  : isRTL
                  ? "إضافة عنوان"
                  : "Add Address"}
              </AppText>

            </View>
          </Pressable>

          {/* Add Address Form */}
          {showForm && (
            <View className="mt-5 p-4 rounded-2xl bg-gray-50">

              <AppText
                weight="bold"
                className="text-[14px] text-black mb-4"
              >
                {isRTL
                  ? "عنوان جديد"
                  : "New Address"}
              </AppText>

              {/* Address Title */}
              <AppText
                weight="semibold"
                className="text-[11px] text-gray-500 mb-2"
              >
                {isRTL
                  ? "اسم العنوان"
                  : "Address Name"}
              </AppText>

              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder={
                  isRTL
                    ? "مثال: المنزل"
                    : "Example: Home"
                }
                placeholderTextColor="#aaa"
                textAlign={
                  isRTL ? "right" : "left"
                }
                className="h-12 px-4 rounded-xl bg-white text-black"
              />

              {/* Address */}
              <AppText
                weight="semibold"
                className="text-[11px] text-gray-500 mb-2 mt-4"
              >
                {isRTL
                  ? "العنوان"
                  : "Address"}
              </AppText>

              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder={
                  isRTL
                    ? "مثال: الرياض، السعودية"
                    : "Example: Riyadh, Saudi Arabia"
                }
                placeholderTextColor="#aaa"
                textAlign={
                  isRTL ? "right" : "left"
                }
                className="h-12 px-4 rounded-xl bg-white text-black"
              />

              {/* Save */}
              <Pressable
                onPress={handleAddAddress}
                className="mt-5 h-12 rounded-xl bg-black items-center justify-center active:opacity-80"
              >
                <AppText
                  weight="bold"
                  className="text-white text-[12px]"
                >
                  {isRTL
                    ? "حفظ العنوان"
                    : "Save Address"}
                </AppText>
              </Pressable>

            </View>
          )}

          {/* Saved Addresses */}
          <View className="mt-7">

            <AppText
              weight="bold"
              className="text-[15px] text-black mb-3"
            >
              {isRTL
                ? "العناوين المحفوظة"
                : "Saved Addresses"}
            </AppText>

            {addresses.length === 0 ? (

              <View className="items-center py-16">

                <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center">

                  <Ionicons
                    name="location-outline"
                    size={32}
                    color="#999"
                  />

                </View>

                <AppText
                  weight="bold"
                  className="text-[17px] text-black mt-5"
                >
                  {isRTL
                    ? "مفيش عناوين"
                    : "No Addresses"}
                </AppText>

                <AppText
                  weight="regular"
                  className="text-[11px] text-gray-400 mt-2"
                >
                  {isRTL
                    ? "أضف عنوان شحن جديد"
                    : "Add a new shipping address"}
                </AppText>

              </View>

            ) : (

              addresses.map((item) => (

                <View
                  key={item.id}
                  className="mb-3 p-4 rounded-2xl bg-gray-50"
                >

                  {/* Address Info */}
                  <View
                    className="items-center"
                    style={{
                      flexDirection: row,
                    }}
                  >

                    <View className="w-11 h-11 rounded-xl bg-white items-center justify-center">

                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#111"
                      />

                    </View>

                    <View className="flex-1 mx-3">

                      <View
                        className="items-center"
                        style={{
                          flexDirection: row,
                        }}
                      >

                        <AppText
                          weight="bold"
                          className="text-[13px] text-black"
                        >
                          {item.title}
                        </AppText>

                        {item.isDefault && (
                          <View className="ml-2 px-2 py-1 rounded-full bg-black">

                            <AppText
                              weight="semibold"
                              className="text-[8px] text-white"
                            >
                              {isRTL
                                ? "أساسي"
                                : "Default"}
                            </AppText>

                          </View>
                        )}

                      </View>

                      <AppText
                        weight="regular"
                        numberOfLines={2}
                        className="text-[10px] text-gray-400 mt-1"
                      >
                        {item.address}
                      </AppText>

                    </View>

                  </View>

                  {/* Actions */}
                  <View
                    className="mt-4 pt-3 border-t border-gray-200 items-center justify-between"
                    style={{
                      flexDirection: row,
                    }}
                  >

                    {!item.isDefault ? (

                      <Pressable
                        onPress={() =>
                          handleSetDefault(
                            item.id
                          )
                        }
                        className="px-3 py-2 rounded-lg bg-white active:opacity-70"
                      >

                        <AppText
                          weight="semibold"
                          className="text-[10px] text-black"
                        >
                          {isRTL
                            ? "تعيين كأساسي"
                            : "Set Default"}
                        </AppText>

                      </Pressable>

                    ) : (

                      <View />

                    )}

                    <Pressable
                      onPress={() =>
                        handleDeleteAddress(
                          item.id
                        )
                      }
                      className="w-9 h-9 rounded-lg bg-white items-center justify-center active:opacity-60"
                    >

                      <Ionicons
                        name="trash-outline"
                        size={15}
                        color="#777"
                      />

                    </Pressable>

                  </View>

                </View>

              ))

            )}

          </View>

        </ScrollView>

      </View>

    </SafeAreaView>
  );
}