import axios from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { BASE_URL } from '@/api';
import { LOGIN_PATH } from '@/constant/appConstants';
import { handleErrors } from '@/utils/custom-error';

export const AUTH_OPTIONS: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      id: 'login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, _req) {
        try {
          const { data } = await axios.post<User>(`${BASE_URL}${LOGIN_PATH}`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          return data;
        } catch (error) {
          handleErrors(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/',
    signOut: '/',
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    async jwt({ token, user }) {
      //pass the token and user to the jwt callback
      if (user) {
        return {
          ...token,
          user: user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      //pass the session and user to the session callback
      return {
        ...session,
        user: token.user,
      };
    },
  },
};
