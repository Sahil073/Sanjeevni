import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AlertItem {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  time: string;
  icon: string;
  category: "environmental" | "vitals" | "device";
}

const mockAlerts: AlertItem[] = [
  {
    id: "1",
    type: "warning",
    title: "High Heat Index Detected",
    description: "Ambient heat index reached 39°C. Increase hydration and seek shade to prevent heat stroke.",
    time: "10 mins ago",
    icon: "☀️",
    category: "environmental",
  },
  {
    id: "2",
    type: "info",
    title: "Moderate Air Quality (AQI 112)",
    description: "Particulate matter levels are elevated. Sensitive individuals should consider wearing a mask outdoors.",
    time: "45 mins ago",
    icon: "🌫️",
    category: "environmental",
  },
  {
    id: "3",
    type: "critical",
    title: "Elevated Heart Rate Spike",
    description: "Heart rate exceeded 135 BPM while stationary. Please rest and monitor your respiration.",
    time: "2 hours ago",
    icon: "❤️",
    category: "vitals",
  },
  {
    id: "4",
    type: "info",
    title: "Sanjeevni T-Shirt Battery",
    description: "Wearable module battery level is at 25%. Connect magnetic charging dock tonight.",
    time: "Yesterday",
    icon: "🔋",
    category: "device",
  },
];

export default function AlertsScreen() {
  const [activeFilter, setActiveFilter] = useState<"all" | "environmental" | "vitals" | "device">("all");

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (activeFilter === "all") return true;
    return alert.category === activeFilter;
  });

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
            Alerts & Safety
          </Text>
          <Text className="font-poppins-regular text-sm text-[#55695E] mt-0.5">
            Real-time environmental and vital notifications
          </Text>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-5"
          contentContainerStyle={{ gap: 8 }}
        >
          {(["all", "environmental", "vitals", "device"] as const).map((filter) => {
            const isSelected = activeFilter === filter;
            const labels = {
              all: "All Alerts",
              environmental: "Environmental",
              vitals: "Vitals",
              device: "Wearable",
            };

            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.75}
                onPress={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full border ${
                  isSelected
                    ? "bg-[#214332] border-[#214332]"
                    : "bg-white border-[#E2E8E4]"
                }`}
              >
                <Text
                  className={`font-poppins-medium text-xs ${
                    isSelected ? "text-white" : "text-[#55695E]"
                  }`}
                >
                  {labels[filter]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Alerts List */}
        <View className="space-y-3">
          {filteredAlerts.map((alert) => {
            return (
              <View
                key={alert.id}
                className="bg-white rounded-2xl p-4 border border-[#E9EFEA] shadow-sm mb-3"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Text className="text-xl mr-2">{alert.icon}</Text>
                    <Text className="font-poppins-bold text-[15px] text-[#101C16]">
                      {alert.title}
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-0.5 rounded-full border ${
                      alert.type === "critical"
                        ? "bg-red-50 border-red-200"
                        : alert.type === "warning"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <Text
                      className={`font-poppins-semibold text-[10px] uppercase ${
                        alert.type === "critical"
                          ? "text-red-600"
                          : alert.type === "warning"
                          ? "text-amber-700"
                          : "text-blue-700"
                      }`}
                    >
                      {alert.type}
                    </Text>
                  </View>
                </View>

                <Text className="font-poppins-regular text-[13px] text-[#4A6455] leading-relaxed mb-2.5">
                  {alert.description}
                </Text>

                <View className="flex-row justify-between items-center pt-2 border-t border-[#F2F6F3]">
                  <Text className="font-poppins-medium text-[11px] text-[#8A9A90]">
                    {alert.time}
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text className="font-poppins-semibold text-xs text-[#214332]">
                      View Details ›
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
