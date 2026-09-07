import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// client — used for public reads (properties list, etc.)
export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

// Authenticated client — pass this a getToken function from Clerk's useAuth() hook
// This attaches the Clerk JWT to every Supabase request so RLS(row level security) can identify the user
export function createClerkSupabaseClient(
  getToken: () => Promise<string | null>,
) {
  return createClient(supabaseURL, supabaseKEY, {
    async accessToken() {
      return getToken();
    },
  });
}

// createClerkSupabaseClient() function take parameter getToken() of type arrow function which returns promise object whose key is of type string and value is of type null....
