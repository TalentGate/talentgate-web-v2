import NextAuth, { Session, Account } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import LinkedinProvider from 'next-auth/providers/linkedin';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account }) {
      if (account?.provider === 'google' && account.id_token) {
        token.provider = account.provider;
        token.idToken = account.id_token;
      }

      if (account?.provider == 'linkedin' && account.access_token) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.provider === 'google' && token.idToken) {
        session.provider = token.provider;
        session.idToken = token.idToken;
      }

      if (token?.provider === 'linkedin' && token.accessToken) {
        session.provider = token.provider;
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
