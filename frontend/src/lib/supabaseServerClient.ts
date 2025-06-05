import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // Next.js App Router で Cookie を設定しようとすると、
            // ヘッダーが既に送信された後などの場合にエラーが発生することがあります。
            // 必要に応じてエラーロギングなどを行ってください。
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.delete({ name, ...options });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (_error) {
            // 同上
          }
        },
      },
    }
  );
}
