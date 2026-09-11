import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";

export default function HomeScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const displayName =
    user?.firstName ||
    user?.fullName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "Friend";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FAF8" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        className="px-5"
      >
        {/* Header Bar */}
        <View className="flex-row items-center justify-between py-2 mb-3">
          <View className="flex-row items-center">
            <Image
              source={images.mascotLogo}
              className="w-10 h-10"
              resizeMode="contain"
            />
            <View className="ml-2.5">
              <Text className="font-poppins-bold text-[22px] text-[#1E3A2B] leading-tight">
                sanjeevni
              </Text>
              <Text className="font-poppins-medium text-[11px] text-[#55695E] -mt-0.5">
                AI Health Companion
              </Text>
            </View>
          </View>

          {/* Connected Device Badge */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/connect-device")}
            className="flex-row items-center bg-[#EBF5EE] border border-[#D5EBDE] px-3 py-1.5 rounded-full"
          >
            <View className="w-2 h-2 rounded-full bg-[#16A34A] mr-1.5" />
            <Text className="font-poppins-medium text-[12px] text-[#214332]">
              T-Shirt Connected
            </Text>
          </TouchableOpacity>
        </View>

        {/* Greeting Banner */}
        <View className="bg-[#214332] rounded-3xl p-5 mb-5 relative overflow-hidden shadow-md shadow-[#214332]/25">
          <View className="pr-20">
            <Text className="font-poppins-semibold text-[13px] text-[#A3D9B8] uppercase tracking-wider mb-1">
              Welcome Back
            </Text>
            <Text className="font-poppins-bold text-[24px] text-white leading-tight">
              Hello, {displayName}!
            </Text>
            <Text className="font-poppins-regular text-[13px] text-[#E0EFE5] mt-1.5 leading-relaxed">
              Your vitals and environmental metrics are within safe, optimal ranges today.
            </Text>
          </View>

          <View className="absolute right-3 bottom-2 opacity-90">
            <Image
              source={images.tshirt}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Real-time Health Metrics Grid */}
        <Text className="font-poppins-bold text-[18px] text-[#101C16] mb-3">
          Live Wearable Metrics
        </Text>

        <View className="flex-row justify-between mb-3">
          {/* Heart Rate Card */}
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2 border border-[#E9EFEA] shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl">❤️</Text>
              <View className="bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                <Text className="font-poppins-semibold text-[10px] text-red-600">
                  Normal
                </Text>
              </View>
            </View>
            <Text className="font-poppins-bold text-[28px] text-[#101C16] leading-none">
              72
            </Text>
            <Text className="font-poppins-medium text-[12px] text-[#7A8E82] mt-0.5">
              Heart Rate • BPM
            </Text>
          </View>

          {/* SpO2 Card */}
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2 border border-[#E9EFEA] shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl">🫁</Text>
              <View className="bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <Text className="font-poppins-semibold text-[10px] text-emerald-600">
                  Optimal
                </Text>
              </View>
            </View>
            <Text className="font-poppins-bold text-[28px] text-[#101C16] leading-none">
              98%
            </Text>
            <Text className="font-poppins-medium text-[12px] text-[#7A8E82] mt-0.5">
              Blood Oxygen • SpO₂
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-5">
          {/* Body Temperature */}
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2 border border-[#E9EFEA] shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl">🌡️</Text>
              <View className="bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                <Text className="font-poppins-semibold text-[10px] text-blue-600">
                  Safe
                </Text>
              </View>
            </View>
            <Text className="font-poppins-bold text-[28px] text-[#101C16] leading-none">
              36.8°
            </Text>
            <Text className="font-poppins-medium text-[12px] text-[#7A8E82] mt-0.5">
              Body Temp • °C
            </Text>
          </View>

          {/* AQI / Air Quality */}
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2 border border-[#E9EFEA] shadow-sm">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-xl">🍃</Text>
              <View className="bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <Text className="font-poppins-semibold text-[10px] text-green-700">
                  Good
                </Text>
              </View>
            </View>
            <Text className="font-poppins-bold text-[28px] text-[#101C16] leading-none">
              42
            </Text>
            <Text className="font-poppins-medium text-[12px] text-[#7A8E82] mt-0.5">
              Air Quality • AQI
            </Text>
          </View>
        </View>

        {/* AI Health Risk Analysis Card */}
        <View className="bg-white rounded-2xl p-4 mb-5 border border-[#E9EFEA] shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-[#EBF5EE] items-center justify-center mr-2.5">
                <Text className="text-base">⚡</Text>
              </View>
              <View>
                <Text className="font-poppins-bold text-[15px] text-[#101C16]">
                  On-Device AI Risk Detection
                </Text>
                <Text className="font-poppins-regular text-[11px] text-[#7A8E82]">
                  TensorFlow Lite Active • Offline Ready
                </Text>
              </View>
            </View>
            <View className="bg-[#EBF5EE] px-2.5 py-1 rounded-full border border-[#D5EBDE]">
              <Text className="font-poppins-semibold text-[11px] text-[#16A34A]">
                Low Risk
              </Text>
            </View>
          </View>

          <Text className="font-poppins-regular text-[12.5px] text-[#4A6455] leading-relaxed">
            No dehydration risks or cardiac anomalies detected in the past 24 hours. Ambient temperature is 28°C with moderate humidity.
          </Text>
        </View>

        {/* Quick Action Button to SOS */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push("/(tabs)/sos")}
          className="w-full bg-[#EBF5EE] border border-[#D5EBDE] rounded-2xl p-4 flex-row items-center justify-between mb-6"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-[#214332] items-center justify-center mr-3">
              <Text className="font-poppins-bold text-white text-xs">SOS</Text>
            </View>
            <View>
              <Text className="font-poppins-bold text-[15px] text-[#101C16]">
                Emergency SOS Hub
              </Text>
              <Text className="font-poppins-regular text-[12px] text-[#55695E]">
                Broadcast GPS location & dispatch emergency SMS
              </Text>
            </View>
          </View>
          <Text className="text-[#214332] font-bold text-lg">›</Text>
        </TouchableOpacity>

        {/* Sign Out Action */}
        <View className="items-center mt-2">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => signOut()}
            className="py-2.5 px-6 rounded-full bg-white border border-[#E9EFEA]"
          >
            <Text className="font-poppins-medium text-xs text-[#DC2626]">
              Sign Out of Sanjeevni
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
