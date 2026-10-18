import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type RequireUserServerResult =
    | { success: false; status: number; message: string }
    | { success: true; user: { id?: string; role?: string; email?: string } };

export async function requireAuthenticatedUser(): Promise<RequireUserServerResult> {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { success: false, status: 401, message: "Unauthorized" };
    }
    return {
        success: true,
        user: {
            id: session.user.id,
            role: session.user.role,
            email: session.user.email ?? undefined,
        },
    };
}