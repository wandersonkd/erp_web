import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        senha: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          return null;
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              senha: credentials.senha,
            },
          );

          const user = response.data;

          // If the backend returns user data and an access_token, it's a success.
          if (user && user.access_token) {
            // NextAuth expects the user object to be returned here.
            // We can attach the token to the user object to pass it to the jwt callback.
            return {
              id: '1', // Placeholder ID since backend doesn't return user ID
              email: credentials.email,
              accessToken: user.access_token,
            };
          }

          return null; // Login failed
        } catch (error) {
          // The error response from axios might contain useful info.
          // For security, we just return null to the client.
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      // On sign-in, the `user` object from `authorize` is passed.
      // We persist the access_token to the NextAuth token.
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Make the access_token available on the session object.
      if (session.user) {
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };