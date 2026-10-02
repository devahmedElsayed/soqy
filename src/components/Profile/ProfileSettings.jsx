import { useEffect, useState } from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

import i18n, { applyRTL } from "../../i18n";

const NOTIFICATIONS_KEY =
  "@souqi_notifications";

export default function ProfileSettings() {
  const { isRTL } = useRTL();

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  // Load notification setting
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const saved =
          await AsyncStorage.getItem(
            NOTIFICATIONS_KEY
          );

        if (saved !== null) {
          setNotificationsEnabled(
            JSON.parse(saved)
          );
        }
      } catch (error) {
        console.log(
          "Error loading notifications:",
          error
        );
      }
    };

    loadNotifications();
  }, []);

  // Change language
  const handleLanguageChange = async () => {
    const newLanguage = isRTL
      ? "en"
      : "ar";

    await i18n.changeLanguage(
      newLanguage
    );

    applyRTL(newLanguage);
  };

  // Toggle notifications
  const handleNotifications = async () => {
    const newValue =
      !notificationsEnabled;

    setNotificationsEnabled(
      newValue
    );

    try {
      await AsyncStorage.setItem(
        NOTIFICATIONS_KEY,
        JSON.stringify(newValue)
      );
    } catch (error) {
      console.log(
        "Error saving notifications:",
        error
      );
    }
  };

  return (
    <View className="px-6 mt-8 mb-6">

      {/* Section Title */}

      <View
        className="mb-3"
        style={{
          alignItems: isRTL
            ? "flex-end"
            : "flex-start",
        }}
      >
        <AppText
          weight="bold"
          className="text-[15px] text-black"
        >
          {isRTL
            ? "الإعدادات"
            : "Settings"}
        </AppText>
      </View>

      <View className="rounded-2xl bg-gray-50 overflow-hidden">

        {/* Language */}

        <Pressable
          onPress={handleLanguageChange}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL
                ? "row-reverse"
                : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="language-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL
                  ? 0
                  : 12,
                marginRight: isRTL
                  ? 12
                  : 0,
                alignItems: isRTL
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL
                    ? "right"
                    : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "اللغة"
                  : "Language"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL
                    ? "right"
                    : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "العربية"
                  : "English"}
              </AppText>
            </View>

            <AppText
              weight="bold"
              className="text-[11px] text-gray-400"
            >
              {isRTL
                ? "EN"
                : "AR"}
            </AppText>
          </View>
        </Pressable>

        <View className="h-[1px] bg-gray-200 mx-4" />

        {/* Notifications */}

        <Pressable
          onPress={handleNotifications}
          className="px-4 py-4 active:opacity-70"
        >
          <View
            className="items-center"
            style={{
              flexDirection: isRTL
                ? "row-reverse"
                : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="notifications-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL
                  ? 0
                  : 12,
                marginRight: isRTL
                  ? 12
                  : 0,
                alignItems: isRTL
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL
                    ? "right"
                    : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "الإشعارات"
                  : "Notifications"}
              </AppText>

              <AppText
                weight="regular"
                className="text-[10px] text-gray-400 mt-1"
                style={{
                  textAlign: isRTL
                    ? "right"
                    : "left",
                  width: "100%",
                }}
              >
                {notificationsEnabled
                  ? isRTL
                    ? "الإشعارات مفعلة"
                    : "Notifications enabled"
                  : isRTL
                  ? "الإشعارات متوقفة"
                  : "Notifications disabled"}
              </AppText>
            </View>

            {/* Switch */}

            <View
              className={`w-11 h-6 rounded-full justify-center px-1 ${
                notificationsEnabled
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            >
              <View
                className={`w-4 h-4 rounded-full bg-white ${
                  notificationsEnabled
                    ? "self-end"
                    : "self-start"
                }`}
              />
            </View>
          </View>
        </Pressable>

        <View className="h-[1px] bg-gray-200 mx-4" />

        {/* Logout */}

        <Pressable className="px-4 py-4 active:opacity-70">
          <View
            className="items-center"
            style={{
              flexDirection: isRTL
                ? "row-reverse"
                : "row",
            }}
          >
            <View className="w-10 h-10 rounded-xl bg-white items-center justify-center">
              <Ionicons
                name="log-out-outline"
                size={19}
                color="#111"
              />
            </View>

            <View
              className="flex-1"
              style={{
                marginLeft: isRTL
                  ? 0
                  : 12,
                marginRight: isRTL
                  ? 12
                  : 0,
                alignItems: isRTL
                  ? "flex-end"
                  : "flex-start",
              }}
            >
              <AppText
                weight="semibold"
                className="text-[13px] text-black"
                style={{
                  textAlign: isRTL
                    ? "right"
                    : "left",
                  width: "100%",
                }}
              >
                {isRTL
                  ? "تسجيل الخروج"
                  : "Log Out"}
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