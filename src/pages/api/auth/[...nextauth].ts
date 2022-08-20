import NextAuth, { type NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    })
  ]
};

export default NextAuth(authOptions);
