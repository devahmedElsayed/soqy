import { ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import BottomNav from "../components/BottomNav";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileMenu from "../components/Profile/ProfileMenu";
import ProfileSettings from "../components/Profile/ProfileSettings";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">

        {/* Header */}

        <ProfileHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 110,
          }}
        >

          {/* Profile Info */}

          <ProfileInfo />

          {/* Account */}

          <ProfileMenu />

          {/* Settings */}

          <ProfileSettings />

        </ScrollView>

        {/* Bottom Navigation */}

        <BottomNav />

      </View>
    </SafeAreaView>
  );
}