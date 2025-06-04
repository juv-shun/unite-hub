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

  // Redirect to home if not authenticated and not already on the home page
  if (!session && request.nextUrl.pathname !== '/') {
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
