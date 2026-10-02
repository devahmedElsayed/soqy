import {
  View,
  Pressable,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function Footer() {
  const {
    isRTL,
    row,
    writingDirection,
  } = useRTL();

  const openWhatsApp = () => {
    Linking.openURL(
      "https://wa.me/"
    );
  };

  return (
    <View className="mt-20 bg-black px-6 pt-10 pb-5">

      {/* Brand */}
      <View className="items-center">

        <AppText
          weight="bold"
          className="text-white text-[30px]"
        >
          {isRTL ? "سوقي" : "SOUQI"}
        </AppText>

        <AppText
          weight="regular"
          className="text-gray-400 text-[11px] mt-2 text-center"
          style={{
            writingDirection,
          }}
        >
          {isRTL
            ? "تجربة تسوق بسيطة، عصرية ومميزة."
            : "A simple, modern and premium shopping experience."}
        </AppText>

      </View>

      {/* Divider */}
      <View className="h-[1px] bg-white/10 my-8" />

      {/* Links */}
      <View className="items-center">

        {/* Home */}
        <Pressable
          onPress={() =>
            router.push("/")
          }
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "الرئيسية"
              : "Home"}
          </AppText>
        </Pressable>

        {/* Products */}
        <Pressable
          onPress={() =>
            router.push(
              "/products"
            )
          }
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "المنتجات"
              : "Products"}
          </AppText>
        </Pressable>

        {/* Cart */}
        <Pressable
          onPress={() =>
            router.push("/cart")
          }
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "السلة"
              : "Cart"}
          </AppText>
        </Pressable>

        {/* Favorites */}
        <Pressable
          onPress={() =>
            router.push(
              "/favorites"
            )
          }
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "المفضلة"
              : "Favorites"}
          </AppText>
        </Pressable>

        {/* Profile */}
        <Pressable
          onPress={() =>
            router.push(
              "/profile"
            )
          }
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "حسابي"
              : "My Account"}
          </AppText>
        </Pressable>

        {/* Contact */}
        <Pressable
          onPress={openWhatsApp}
          className="py-2 active:opacity-60"
        >
          <AppText
            weight="medium"
            className="text-white text-[12px]"
          >
            {isRTL
              ? "تواصل معنا"
              : "Contact Us"}
          </AppText>
        </Pressable>

      </View>

      {/* Social */}
      <View
        className="justify-center items-center mt-7"
        style={{
          flexDirection: row,
        }}
      >

        {/* Instagram */}
        <Pressable
          className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mx-1 active:opacity-60"
        >
          <Ionicons
            name="logo-instagram"
            size={17}
            color="#fff"
          />
        </Pressable>

        {/* Facebook */}
        <Pressable
          className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mx-1 active:opacity-60"
        >
          <Ionicons
            name="logo-facebook"
            size={17}
            color="#fff"
          />
        </Pressable>

        {/* X */}
        <Pressable
          className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mx-1 active:opacity-60"
        >
          <Ionicons
            name="logo-twitter"
            size={17}
            color="#fff"
          />
        </Pressable>

      </View>

      {/* Bottom Divider */}
      <View className="h-[1px] bg-white/10 mt-8 mb-5" />

      {/* Copyright */}
      <AppText
        weight="regular"
        className="text-gray-500 text-[9px] text-center"
      >
        © 2026 SOUQI.{" "}
        {isRTL
          ? "جميع الحقوق محفوظة"
          : "All rights reserved."}
      </AppText>

    </View>
  );
}