import NextAuth, { type NextAuthOptions } from 'next-auth';
import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }

      if (account) {
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      if (typeof token.refreshToken === 'string') {
        session.refreshToken = token.refreshToken;
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
          image: profile.snoovatar_img
        };
      },
      authorization: {
        params: {
          scope: 'identity mysubreddits read',
          duration: 'permanent'
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
