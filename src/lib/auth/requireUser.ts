import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

type RequireUserResult =
    | {
          success: false;
          status: number;
          message: string;
      }
    | {
          success: true;
          user: {
              id?: string;
              role?: string;
              email?: string;
          };
      };

export async function requireUser(
    req: NextRequest
): Promise<RequireUserResult> {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        return {
            success: false,
            status: 401,
            message: "Unauthorized",
        };
    }

    const sessionToken = token as typeof token & { id?: string; role?: string };

    return {
        success: true,
        user: {
            id: sessionToken.id,
            role: sessionToken.role,
            email: sessionToken.email ?? undefined,
        },
    };
}