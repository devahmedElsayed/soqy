import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../AppText";
import useRTL from "../../hooks/useRTL";

export default function ProfileInfo() {
  const { isRTL } = useRTL();

  return (
    <View className="px-6 mt-5">

      {/* Avatar */}
      <View className="items-center">
        <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center">
          <Ionicons
            name="person-outline"
            size={42}
            color="#111"
          />
        </View>
      </View>

      {/* User Info */}
      <View className="items-center mt-4">

        <AppText
          weight="bold"
          className="text-[20px] text-black"
        >
          {isRTL ? "أحمد السيد" : "Ahmed Elsayed"}
        </AppText>

        <AppText
          weight="regular"
          className="text-[12px] text-gray-400 mt-1"
        >
          ahmed@example.com
        </AppText>

      </View>

    </View>
  );
}