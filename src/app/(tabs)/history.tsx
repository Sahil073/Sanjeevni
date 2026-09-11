import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryScreen() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("day");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7FAF8" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 12 }}
        showsVerticalScrollIndicator={false}
        className="px-5"
      >
        {/* Header */}
        <View className="mb-4">
          <Text className="font-poppins-bold text-[28px] text-[#101C16]">
            Health History
          </Text>
          <Text className="font-poppins-regular text-sm text-[#55695E] mt-0.5">
            Offline SQLite records from your Sanjeevni wearable
          </Text>
        </View>

        {/* Period Segmented Switcher */}
        <View className="flex-row bg-[#EBF5EE] p-1 rounded-2xl mb-5">
          {(["day", "week", "month"] as const).map((item) => {
            const isSelected = period === item;
            const labels = { day: "Today", week: "Past 7 Days", month: "Past Month" };

            return (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setPeriod(item)}
                className={`flex-1 py-2 rounded-xl items-center justify-center ${
                  isSelected ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`font-poppins-medium text-xs ${
                    isSelected ? "text-[#214332] font-poppins-bold" : "text-[#55695E]"
                  }`}
                >
                  {labels[item]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ECG Diagnostic Session Card */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-[#E9EFEA] shadow-sm">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="text-xl mr-2">📈</Text>
              <Text className="font-poppins-bold text-[15px] text-[#101C16]">
                ECG Cardiac Sessions
              </Text>
            </View>
            <View className="bg-[#EBF5EE] px-2 py-0.5 rounded-full">
              <Text className="font-poppins-semibold text-[11px] text-[#16A34A]">
                Normal Sinus
              </Text>
            </View>
          </View>

          <Text className="font-poppins-regular text-xs text-[#55695E] leading-relaxed mb-3">
            3 lead recordings synchronized from wearable sensors. No ST-elevation or premature ventricular contractions detected.
          </Text>

          <View className="bg-[#F8FAF9] rounded-xl p-3 flex-row justify-between items-center border border-[#EAEFEA]">
            <View>
              <Text className="font-poppins-medium text-[11px] text-[#8A9A90]">
                Latest Session
              </Text>
              <Text className="font-poppins-bold text-sm text-[#101C16]">
                10:30 AM • 5 min record
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="font-poppins-semibold text-xs text-[#214332]">
                Export PDF ›
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Average Vitals Trend Card */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-[#E9EFEA] shadow-sm">
          <Text className="font-poppins-bold text-[15px] text-[#101C16] mb-3">
            Summary Trends
          </Text>

          <View className="flex-row justify-between py-2 border-b border-[#F2F6F3]">
            <Text className="font-poppins-medium text-xs text-[#55695E]">
              Average Heart Rate
            </Text>
            <Text className="font-poppins-bold text-xs text-[#101C16]">
              71 BPM
            </Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-[#F2F6F3]">
            <Text className="font-poppins-medium text-xs text-[#55695E]">
              Average SpO₂
            </Text>
            <Text className="font-poppins-bold text-xs text-[#101C16]">
              98.2%
            </Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-[#F2F6F3]">
            <Text className="font-poppins-medium text-xs text-[#55695E]">
              Average Temperature
            </Text>
            <Text className="font-poppins-bold text-xs text-[#101C16]">
              36.7 °C
            </Text>
          </View>

          <View className="flex-row justify-between py-2">
            <Text className="font-poppins-medium text-xs text-[#55695E]">
              Hydration Deficit Alerts
            </Text>
            <Text className="font-poppins-bold text-xs text-[#16A34A]">
              0 Detected
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
