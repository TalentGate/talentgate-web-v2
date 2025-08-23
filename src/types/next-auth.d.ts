declare module 'next-auth' {
  interface Session {
    provider?: 'google' | 'linkedin';
    idToken?: string;
    accessToken?: string;
  }
  interface Account {
    provider: string;
    access_token?: string;
    id_token?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    provider?: 'google' | 'linkedin';
    idToken?: string;
    accessToken?: string;
  }
}
