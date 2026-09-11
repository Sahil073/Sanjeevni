import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  email?: string;
  onSuccess?: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  visible,
  onClose,
  email = "alex@gmail.com",
  onSuccess,
}) => {
  const router = useRouter();
  const [code, setCode] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setCode("");
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleCodeChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);

    if (cleaned.length === 6) {
      // Short delay for visual feedback before auto-navigating to home route (/)
      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          router.replace("/");
        }
      }, 350);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable
          onPress={onClose}
          className="flex-1 bg-black/50 justify-center items-center px-5"
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
          >
            {/* Top Close Button */}
            <View className="flex-row justify-end">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
              >
                <Text className="text-gray-500 font-poppins-semibold text-sm">
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email Verification Icon */}
            <View className="items-center -mt-2 mb-3">
              <View className="w-14 h-14 rounded-full bg-[#EBF5EE] items-center justify-center mb-3 border border-[#D5EBDE]">
                <Text className="text-2xl">✉️</Text>
              </View>
              <Text className="font-poppins-bold text-2xl text-[#101C16] text-center">
                Verify Your Email
              </Text>
              <Text className="font-poppins-regular text-[13px] text-[#55695E] text-center mt-2 leading-relaxed px-2">
                We have sent a 6-digit verification code to{"\n"}
                <Text className="font-poppins-semibold text-[#1E3A2B]">
                  {email}
                </Text>
                . Enter the code below.
              </Text>
            </View>

            {/* 6 Digit Slots */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              className="flex-row justify-between items-center my-6 px-1"
            >
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const digit = code[index] || "";
                const isFocused = code.length === index;

                return (
                  <View
                    key={index}
                    className={`w-11 h-14 rounded-2xl items-center justify-center border-2 ${
                      digit
                        ? "border-[#214332] bg-[#F1F7F3]"
                        : isFocused
                        ? "border-[#33684B] bg-white shadow-sm"
                        : "border-[#E2E8E4] bg-[#FAFAFA]"
                    }`}
                  >
                    <Text className="font-poppins-bold text-2xl text-[#101C16]">
                      {digit}
                    </Text>
                  </View>
                );
              })}
            </Pressable>

            {/* Hidden TextInput for native Number Pad input */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus={true}
              style={{
                position: "absolute",
                opacity: 0.01,
                width: 1,
                height: 1,
              }}
            />

            {/* Resend Code Link */}
            <View className="flex-row justify-center items-center mt-1">
              <Text className="font-poppins-regular text-xs text-[#6B7280]">
                Didn{"'"}t receive code?{" "}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setCode("")}
              >
                <Text className="font-poppins-semibold text-xs text-[#214332] underline">
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
