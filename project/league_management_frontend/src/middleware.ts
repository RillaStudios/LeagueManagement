// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from './lib/service/auth/auth_service';

/* 
A middleware function to help protect routes 
that require authentication.

@Author: IFD
@Since: 2025-03-04
*/
export async function middleware(req: NextRequest) {

    // Get the current session
    const session = await getAuthSession(req);

    // If the user is not authenticated, redirect to the login page
    if (!session || !session.isAuthenticated) {

        // Redirect to the login page
        return NextResponse.redirect(new URL('/?showAuth=true', req.url));

    }

    // If the user is authenticated, continue to the page
    return NextResponse.next();
}

// A config of the protected routes
export const config = {
    matcher: ['/account/:path*'],
};
