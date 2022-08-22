import NextAuth, { type NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: null,
          image: profile.snoovatar_img
        };
      },
      authorization: {
        params: {
          duration: 'permanent'
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
