import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { requireAdmin } from "./lib/auth/requireAdmin";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;


    if (url.pathname.startsWith("/admin")) {
        const admin = await requireAdmin(request);

        if (!admin.success) {
            return NextResponse.redirect(
                new URL("/sign-in", request.url)
            );
        }
    }

    // if (token && // if token present and user try to fetch this routes redirect to dashboard
    //     (
    //         url.pathname.startsWith("/sign-in") ||
    //         url.pathname.startsWith("/sign-up")
    //     )
    // ) {
    //     if (token.role === "seller") {
    //         return NextResponse.redirect(new URL("/seller/dashboard", request.url));
    //     }
    //     return NextResponse.redirect(new URL("/dashboard", request.url));
    // }

    // if ( /// no token and user in /dashboard redirect to sign-in 
    //     !token &&
    //     url.pathname.startsWith("/seller") ||
    //     url.pathname.startsWith("/profile")
    // ) {
    //     return NextResponse.redirect(
    //         new URL("/sign-in", request.url)
    //     );
    // }

    // return NextResponse.next(); 
}

export const config = { // Middleware is check before this routes 
    matcher: [
        "/sign-in",
        "/sign-up",
        "/verify",
        "/seller/:path*",
        "/profile",
        "/admin/:path*",
        "/api/admin/:path*",
    ],
}; 