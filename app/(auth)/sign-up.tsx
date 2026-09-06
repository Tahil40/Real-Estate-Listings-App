import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignUpPage() {
  const [FirstName, SetFirstName] = useState("");
  const [LastName, SetLastName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Code, SetCode] = useState("");

  const { isSignedIn } = useAuth();
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  // if fetchStatus is equals to fetching then it's in loading state....
  const isLoading = fetchStatus === "fetching";

  const onSignUpPress = () => {};

  return (
    <SafeAreaView className="bg-white h-full pb-[50%] pt-[30%]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        className="bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          <Image
            source={require("../../assets/images/kribb.png")}
            className="w-32 h-16 mb-8"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </Text>
          <Text className="text-gray-500 mb-8">Find your dream home today</Text>

          <View className="flex-row gap-3 mb-4">
            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
              placeholder="First name"
              placeholderTextColor={"#9CA3AF"}
              autoCapitalize="words"
              value={FirstName}
              onChangeText={SetFirstName}
            />

            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
              placeholder="Last name"
              placeholderTextColor={"#9CA3AF"}
              autoCapitalize="words"
              value={LastName}
              onChangeText={SetLastName}
            />
          </View>

          <View className="flex-col mb-4">
            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mb-4"
              placeholder="Email Address"
              placeholderTextColor={"#9CA3AF"}
              autoCapitalize="none"
              value={Email}
              onChangeText={SetEmail}
              keyboardType="email-address"
            />

            {errors.fields.emailAddress && (
              <Text className="text-red-500 mb-4">
                {errors.fields.emailAddress.message}
              </Text>
            )}

            <TextInput
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 mb-4"
              placeholder="Password"
              placeholderTextColor={"#9CA3AF"}
              autoCapitalize="none"
              value={Password}
              onChangeText={SetPassword}
              secureTextEntry
            />

            {errors.fields.password && (
              <Text className="text-red-500 mb-4">
                {errors.fields.password.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            disabled={isLoading}
            onPress={onSignUpPress}
            className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <Text className="text-white font-bold text-base">Sign Up</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">Already have an account? </Text>
            <Link href={"/sign-in"}>
              <Text className="text-blue-600 font-semibold">Sign In</Text>
            </Link>
          </View>

          {/* if clerk wants to verify use through captcha then it uses this view */}
          <View nativeID="clerk-captcha" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
