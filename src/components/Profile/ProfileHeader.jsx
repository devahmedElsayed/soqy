import { View, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProfileHeader() {
  const { isRTL } = useRTL();
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <View className="px-6 pt-5 pb-3">

      <View className="h-10 items-center justify-center">

        {/* Back Button */}

        <Pressable
          onPress={handleBack}
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

        {/* Center Title */}

        <AppText
          weight="bold"
          className="text-[20px] text-black"
        >
          {isRTL
            ? "حسابي"
            : "My Account"}
        </AppText>

      </View>

    </View>
  );
}