import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async (req) => {
    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL(req.url + '/auth/login', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  api: {
    bodyParser: false,
  },
  matcher: ['/', '/account-settings', '/chatbox', '/control-panel/:path*', '/monitoring', '/weather']
}
