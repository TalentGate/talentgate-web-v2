import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ["/dashboard"];
const unprotectedRoutes = ["/login", "/register", "/password"];

export default async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (unprotectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (accessToken && refreshToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path))) {
        if (!accessToken || !refreshToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register', '/password', '/dashboard/:path*'],
};
