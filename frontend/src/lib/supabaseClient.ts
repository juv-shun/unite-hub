import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // 環境変数が設定されていない場合のエラーハンドリングを追加するとより堅牢になります。
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
