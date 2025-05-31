-- supabase/migrations/20250531025004_create_users_table.sql

CREATE TABLE public.users (
    id uuid NOT NULL DEFAULT auth.uid(),
    username text NOT NULL, -- ユーザーが設定可能な表示名。初回登録時はDiscordのグローバル名がデフォルト値となる想定。
    discord_id text UNIQUE NOT NULL, -- DiscordのユーザーID (Supabase Authのprovider_tokenなどから取得)
    avatar_url text, -- DiscordのアバターURL
    email text, -- Discordから取得したメールアドレス (取得可能な場合)
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- RLS (Row Level Security) を有効にする
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- テーブルとカラムにコメントを追加
COMMENT ON TABLE public.users IS 'Stores user profile information, linked to Supabase Auth users.';
COMMENT ON COLUMN public.users.id IS 'References auth.users.id and serves as the primary key.';
COMMENT ON COLUMN public.users.username IS 'User-configurable display name. Defaults to Discord global name on first registration. This is the primary display name in the app.';
COMMENT ON COLUMN public.users.discord_id IS 'Unique Discord user ID from Discord OAuth.';
COMMENT ON COLUMN public.users.avatar_url IS 'URL of the user''s Discord avatar.';
COMMENT ON COLUMN public.users.email IS 'User''s email address, retrieved from Discord (if available and permitted).';

-- RLSポリシーの定義 (このマイグレーションに含める)
-- ユーザーは自身の情報のみ参照できる
CREATE POLICY "Allow individual user read access"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- ユーザーは自身の情報のみ作成できる
CREATE POLICY "Allow individual user insert access"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- ユーザーは自身の情報のみ更新できる
CREATE POLICY "Allow individual user update access"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
