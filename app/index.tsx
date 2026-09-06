import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function ModalScreen() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  // redirect user based on auth state....
  if (isSignedIn) return <Redirect href={"/(root)/(tabs)/index"} />;

  return <Redirect href={"/sign-in"} />;
}
