import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";
import { ensureUserExists } from "../../../lib/userService";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error.message);
      return NextResponse.redirect(
        `${origin}/auth/auth-code-error?error=${encodeURIComponent(
          error.name
        )}&error_description=${encodeURIComponent(error.message)}`
      );
    }

    // セッション確立後、ユーザー情報を取得してusersテーブルにレコードを作成
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await ensureUserExists(supabase, user);
      } else {
        console.warn("No user found after successful session exchange");
      }
    } catch (userError) {
      // ユーザー作成エラーはログに記録するが、ログインフローは継続
      console.error("Error creating user record:", userError);
      // 必要に応じてエラー追跡サービスに送信
    }

    return NextResponse.redirect(`${origin}${next}`);
  }

  console.error("No code found in callback URL");
  return NextResponse.redirect(
    `${origin}/auth/auth-code-error?error=No%20code%20found&error_description=No%20code%20found%20in%20callback`
  );
}
