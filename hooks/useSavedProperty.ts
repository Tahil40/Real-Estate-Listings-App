import { useAuth } from "@clerk/expo";
import { useEffect, useState } from "react";
import { useSupabase } from "../hooks/useSupabase";

export function useSavedProperty(propertyId: string, onUnSave?: () => void) {
  const { userId } = useAuth();
  const authSupabase = useSupabase();

  const [IsSaved, SetIsSaved] = useState(false);
  const [SaveLoading, SetSaveLoading] = useState(false);

  const checkIfSaved = async () => {
    if (!userId) return null;
    const { data } = await authSupabase
      .from("saved_properties")
      .select("id")
      .eq("user_clerk_id", userId)
      .eq("property_id", propertyId)
      .single();
    console.log("Data: ", data);
    SetIsSaved(!!data);
  };

  useEffect(() => {
    checkIfSaved();
  }, [propertyId, userId]);

  const toggleSave = async () => {
    if (!userId) return null;
    SetSaveLoading(true);
    if (IsSaved) {
      await authSupabase
        .from("saved_properties")
        .delete()
        .eq("user_clerk_id", userId)
        .eq("property_id", propertyId);
      SetIsSaved(false);
      onUnSave?.();
    } else {
      await authSupabase
        .from("saved_properties")
        .insert({ user_clerk_id: userId, property_id: propertyId });
      SetIsSaved(true);
    }
    SetSaveLoading(false);
  };

  return {SaveLoading, IsSaved, toggleSave};
}
