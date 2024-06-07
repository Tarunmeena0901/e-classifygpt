import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH  = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID || "",
          clientSecret: process.env.GOOGLE_SECRET || "",
          authorization: {
            params: {
              scope: 'profile email openid https://www.googleapis.com/auth/gmail.readonly',
            },
          },
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async redirect({ url, baseUrl } : {url: string , baseUrl: string}) {
          // Redirect to /home after login and / after logout
          if (url.startsWith('/api/auth/signin')) {
            return `${baseUrl}/home`;
          }
          return baseUrl;
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            return session;
          },
        async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token;
              token.refreshToken = account.refresh_token;
            }
            return token;
        },
      }
}