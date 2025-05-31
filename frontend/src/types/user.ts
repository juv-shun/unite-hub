export interface UserProfile {
  id: string;
  username: string;
  discord_id: string;
  avatar_url?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  username: string;
  discord_id: string;
  avatar_url?: string;
  email?: string;
}
