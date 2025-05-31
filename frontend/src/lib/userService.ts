import { CreateUserData, UserProfile } from "@/types/user";
import { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Discord OAuth情報からユーザー作成データを生成
 */
export function createUserDataFromAuth(user: User): CreateUserData {
  const discordId = user.user_metadata?.provider_id || user.user_metadata?.sub;
  const username =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    `User_${discordId}`;
  const avatarUrl = user.user_metadata?.avatar_url;
  const email = user.email;

  if (!discordId) {
    throw new Error("Discord ID not found in user metadata");
  }

  return {
    username,
    discord_id: discordId,
    avatar_url: avatarUrl,
    email: email,
  };
}

/**
 * usersテーブルでユーザーの存在確認
 */
export async function checkUserExists(
  supabase: SupabaseClient,
  userId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = レコードが見つからない以外のエラー
    throw error;
  }

  return !!data;
}

/**
 * usersテーブルにユーザーを作成
 */
export async function createUser(
  supabase: SupabaseClient,
  userId: string,
  userData: CreateUserData
): Promise<UserProfile> {
  const { data, error } = await supabase
    .from("users")
    .insert({
      id: userId,
      ...userData,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

/**
 * ユーザーの存在確認と必要に応じた作成を行う
 */
export async function ensureUserExists(
  supabase: SupabaseClient,
  user: User
): Promise<UserProfile | null> {
  try {
    const userExists = await checkUserExists(supabase, user.id);

    if (userExists) {
      console.log(`User ${user.id} already exists in users table`);
      return null;
    }

    console.log(`Creating new user record for ${user.id}`);
    const userData = createUserDataFromAuth(user);
    const newUser = await createUser(supabase, user.id, userData);

    console.log(`Successfully created user: ${newUser.username}`);
    return newUser;
  } catch (error) {
    console.error("Error ensuring user exists:", error);
    throw error;
  }
}
