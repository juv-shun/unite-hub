import { NextResponse, type NextRequest } from 'next/server';
import { createSupabaseServerClient } from './lib/supabaseServerClient';

export async function middleware(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // If not authenticated and not trying to access /login, redirect to /login
  // The `config.matcher` already excludes /auth/*, /api/*, etc.
  if (!session && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated and trying to access /login, redirect to home
  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - auth (auth routes like login, callback)
     */
    '/((?!_next/static|_next/image|favicon.ico|api|auth).*)',
  ],
};
