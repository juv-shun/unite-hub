import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '../../../lib/supabaseServerClient';


export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Error exchanging code for session:', error.message);
      return NextResponse.redirect(`${origin}/auth/auth-code-error?error=${encodeURIComponent(error.name)}&error_description=${encodeURIComponent(error.message)}`);
    }
    return NextResponse.redirect(`${origin}${next}`);
  }

  console.error('No code found in callback URL');
  return NextResponse.redirect(`${origin}/auth/auth-code-error?error=No%20code%20found&error_description=No%20code%20found%20in%20callback`);
}