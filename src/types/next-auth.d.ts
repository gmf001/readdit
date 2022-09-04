import { DefaultSession, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession['user'];
    refreshToken?: string;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    refreshToken?: string;
    accessToken?: string;
  }
}
