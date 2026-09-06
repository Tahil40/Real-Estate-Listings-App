import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  // function to handle sign-up form....
  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: Email,
      password: Password,
      firstName: FirstName,
      lastName: LastName,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      Alert.alert("Submition Failed");
      return;
    }

    if (!error) {
      return await signUp.verifications.sendEmailCode();
    }
  };

  // function to handle otp verification....
  const verifyOTP = async () => {
    await signUp.verifications.verifyEmailCode({ code: Code });

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session.currentTask);
            return;
          }

          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    } else {
      console.error("Sign-up attempt not complete:", signUp);
      Alert.alert("Sign-up failed");
    }
  };

  // check if the user is already have account or signed-up....
  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  // OTP verification screen....
  if (
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0
  ) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Image
          source={require("../../assets/images/kribb.png")}
          className="w-32 h-16 mb-8"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Verify your account
        </Text>
        <Text className="text-gray-500 mb-8 text-center">
          We sent a code to {Email}
        </Text>

        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Enter verification code"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
          value={Code}
          onChangeText={SetCode}
        />
        {errors.fields.code && (
          <Text className="text-red-500 mb-4">
            {errors.fields.code.message}
          </Text>
        )}

        <TouchableOpacity
          onPress={verifyOTP}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-600">I need a new code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => signUp.reset()} className="py-2">
          <Text className="text-blue-600">Start over</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
