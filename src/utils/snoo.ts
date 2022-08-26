import snoowrap from 'snoowrap';

export async function Snoo(refreshToken?: string): Promise<snoowrap> {
  return new snoowrap({
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken,
    userAgent: 'web:readdit:alpha (by /u/anonymous)'
  });
}
