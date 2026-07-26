import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        username: string;
        isEmailVerified: boolean;
        role: string;
    }

    interface Session {
        user: {
            id: string;
            username: string;
            isEmailVerified: boolean;
            role: string;
        } & DefaultSession['user'] 
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        username: string;
        isEmailVerified: boolean;
    }
}