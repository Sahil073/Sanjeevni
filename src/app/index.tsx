import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

export default function DesignSystemScreen() {
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  const primaryColors = [
    { name: "LINGUA PURPLE", hex: colors.primary.purple },
    { name: "LINGUA DEEP PURPLE", hex: colors.primary.deepPurple },
    { name: "LINGUA BLUE", hex: colors.primary.blue },
    { name: "LINGUA GREEN", hex: colors.primary.green },
  ];

  const semanticColors = [
    { name: "SUCCESS", hex: colors.semantic.success },
    { name: "WARNING", hex: colors.semantic.warning },
    { name: "STREAK", hex: colors.semantic.streak },
    { name: "ERROR", hex: colors.semantic.error },
    { name: "INFO", hex: colors.semantic.info },
  ];

  const neutralColors = [
    { name: "TEXT / PRIMARY", hex: colors.neutral.textPrimary },
    { name: "TEXT / SECONDARY", hex: colors.neutral.textSecondary },
    { name: "BORDER", hex: colors.neutral.border, border: true },
    { name: "SURFACE", hex: colors.neutral.surface, border: true },
    { name: "BACKGROUND", hex: colors.neutral.background, border: true },
  ];

  const typographyScales = [
    {
      level: typography.h1.name,
      role: typography.h1.role,
      size: `${typography.h1.fontSize}px`,
      weight: "Bold",
      lineHeight: `${typography.h1.lineHeightMultiplier}`,
      styleClass: "text-h1",
    },
    {
      level: typography.h2.name,
      role: typography.h2.role,
      size: `${typography.h2.fontSize}px`,
      weight: "SemiBold",
      lineHeight: `${typography.h2.lineHeightMultiplier}`,
      styleClass: "text-h2",
    },
    {
      level: typography.h3.name,
      role: typography.h3.role,
      size: `${typography.h3.fontSize}px`,
      weight: "SemiBold",
      lineHeight: `${typography.h3.lineHeightMultiplier}`,
      styleClass: "text-h3",
    },
    {
      level: typography.h4.name,
      role: typography.h4.role,
      size: `${typography.h4.fontSize}px`,
      weight: "Medium",
      lineHeight: `${typography.h4.lineHeightMultiplier}`,
      styleClass: "text-h4",
    },
    {
      level: typography.bodyLarge.name,
      role: typography.bodyLarge.role,
      size: `${typography.bodyLarge.fontSize}px`,
      weight: "Regular",
      lineHeight: `${typography.bodyLarge.lineHeightMultiplier}`,
      styleClass: "text-body-lg",
    },
    {
      level: typography.bodyMedium.name,
      role: typography.bodyMedium.role,
      size: `${typography.bodyMedium.fontSize}px`,
      weight: "Regular",
      lineHeight: `${typography.bodyMedium.lineHeightMultiplier}`,
      styleClass: "text-body-md",
    },
    {
      level: typography.bodySmall.name,
      role: typography.bodySmall.role,
      size: `${typography.bodySmall.fontSize}px`,
      weight: "Regular",
      lineHeight: `${typography.bodySmall.lineHeightMultiplier}`,
      styleClass: "text-body-sm",
    },
    {
      level: typography.caption.name,
      role: typography.caption.role,
      size: `${typography.caption.fontSize}px`,
      weight: "Regular",
      lineHeight: `${typography.caption.lineHeightMultiplier}`,
      styleClass: "text-caption",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* AUTH USER PROFILE & SIGN OUT BANNER */}
        <View className="bg-[#214332] rounded-3xl p-5 mb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 mr-3">
              <View className="w-12 h-12 rounded-2xl bg-white/10 items-center justify-center mr-3.5">
                <Image
                  source={images.mascotLogo}
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="text-white font-poppins-semibold text-base leading-tight">
                  {user?.firstName
                    ? `Hi, ${user.firstName}`
                    : user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "Welcome"}
                </Text>
                <Text
                  className="text-white/70 font-poppins-regular text-xs mt-1"
                  numberOfLines={1}
                >
                  {user?.primaryEmailAddress?.emailAddress || "Signed in with Clerk"}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => signOut()}
              className="bg-white/20 px-3.5 py-2 rounded-xl"
            >
              <Text className="text-white font-poppins-semibold text-xs">
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* BRAND SECTION */}
        <View className="bg-white rounded-3xl p-6 mb-6 border border-gray-100 shadow-sm">
          <Text className="text-lingua-purple font-poppins-bold text-xs uppercase tracking-widest mb-4">
            BRAND
          </Text>
          <View className="h-[1px] bg-gray-100 mb-6" />

          <View className="flex-row items-center justify-center py-4">
            <Image
              source={images.mascotLogo}
              style={styles.brandMascot}
              resizeMode="contain"
            />
            <Text className="font-poppins-bold text-4xl text-[#0D132B] ml-4">
              lingua
            </Text>
          </View>
        </View>

        {/* COLORS SECTION */}
        <View className="bg-white rounded-3xl p-6 mb-6 border border-gray-100 shadow-sm">
          <Text className="text-lingua-purple font-poppins-bold text-xs uppercase tracking-widest mb-4">
            COLORS
          </Text>
          <View className="h-[1px] bg-gray-100 mb-6" />

          {/* PRIMARY */}
          <Text className="font-poppins-bold text-xs text-text-secondary uppercase tracking-wider mb-4">
            PRIMARY
          </Text>
          <View className="flex-row flex-wrap justify-between mb-8">
            {primaryColors.map((color) => (
              <View key={color.name} className="w-[23%] items-center mb-2">
                <View
                  style={[styles.colorSwatch, { backgroundColor: color.hex }]}
                />
                <Text
                  numberOfLines={2}
                  className="font-poppins-semibold text-[10px] text-text-primary text-center mt-2 leading-tight"
                >
                  {color.name}
                </Text>
                <Text className="font-poppins-regular text-[10px] text-text-secondary mt-1">
                  {color.hex}
                </Text>
              </View>
            ))}
          </View>

          {/* SEMANTIC */}
          <Text className="font-poppins-bold text-xs text-text-secondary uppercase tracking-wider mb-4">
            SEMANTIC
          </Text>
          <View className="flex-row flex-wrap justify-between mb-8">
            {semanticColors.map((color) => (
              <View key={color.name} className="w-[18%] items-center mb-2">
                <View
                  style={[styles.colorSwatch, { backgroundColor: color.hex }]}
                />
                <Text
                  numberOfLines={1}
                  className="font-poppins-semibold text-[9px] text-text-primary text-center mt-2 leading-tight"
                >
                  {color.name}
                </Text>
                <Text className="font-poppins-regular text-[9px] text-text-secondary mt-1">
                  {color.hex}
                </Text>
              </View>
            ))}
          </View>

          {/* NEUTRALS */}
          <Text className="font-poppins-bold text-xs text-text-secondary uppercase tracking-wider mb-4">
            NEUTRALS
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {neutralColors.map((color) => (
              <View key={color.name} className="w-[18%] items-center mb-2">
                <View
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: color.hex },
                    color.border ? styles.swatchBorder : null,
                  ]}
                />
                <Text
                  numberOfLines={2}
                  className="font-poppins-semibold text-[9px] text-text-primary text-center mt-2 leading-tight text-center"
                >
                  {color.name}
                </Text>
                <Text className="font-poppins-regular text-[9px] text-text-secondary mt-1">
                  {color.hex}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* TYPOGRAPHY SECTION */}
        <View className="bg-white rounded-3xl p-6 mb-6 border border-gray-100 shadow-sm">
          <Text className="text-lingua-purple font-poppins-bold text-xs uppercase tracking-widest mb-4">
            TYPOGRAPHY
          </Text>
          <View className="h-[1px] bg-gray-100 mb-6" />

          <Text className="font-poppins-bold text-xs text-text-secondary uppercase tracking-wider mb-2">
            FONT FAMILY
          </Text>
          <Text className="font-poppins-bold text-4xl text-text-primary mb-2">
            Poppins
          </Text>
          <Text className="font-poppins-regular text-sm text-text-secondary leading-relaxed mb-6">
            Poppins is a modern, geometric sans-serif typeface that provides
            excellent readability and a friendly personality.
          </Text>

          {/* TYPOGRAPHY SCALE TABLE */}
          <View className="border-t border-gray-100 pt-4">
            {typographyScales.map((item) => (
              <View
                key={item.level}
                className="py-3 border-b border-gray-50 flex-row items-center justify-between"
              >
                <View className="w-[28%]">
                  <Text className={item.styleClass}>{item.level}</Text>
                </View>
                <View className="w-[42%]">
                  <Text className="font-poppins-regular text-xs text-text-secondary">
                    {item.role}
                  </Text>
                </View>
                <View className="w-[15%] items-end">
                  <Text className="font-poppins-medium text-xs text-text-primary">
                    {item.size}
                  </Text>
                </View>
                <View className="w-[15%] items-end">
                  <Text className="font-poppins-regular text-xs text-text-secondary">
                    {item.lineHeight}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  brandMascot: {
    width: 72,
    height: 72,
  },
  colorSwatch: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
  },
  swatchBorder: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
