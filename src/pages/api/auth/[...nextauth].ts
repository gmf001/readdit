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
        token.accessToken = account.access_token;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      if (token) {
        session.refreshToken = token.refreshToken;
        session.accessToken = token.accessToken;
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
          ...profile,
          image: profile.snoovatar_img
        };
      },
      authorization: {
        params: {
          scope: 'identity mysubreddits read vote',
          duration: 'permanent'
        }
      }
    })
  ]
};

export default NextAuth(authOptions);
