import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  try {
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      await supabase.auth.exchangeCodeForSession(code)
    }

    // URL to redirect to after sign up/sign in process completes
    return NextResponse.redirect(requestUrl.origin + '/(app)')
  } catch (error) {
    // Return the user to an error page with instructions
    return NextResponse.redirect(requestUrl.origin + '/auth/auth-code-error')
  }
}
