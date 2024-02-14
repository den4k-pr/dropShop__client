import type { AuthOptions, User } from 'next-auth'
import GoggleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // Отримати дані користувачів після авторизації
        const res = await fetch(`http://localhost:4200/api/users`, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const users: any[] = await res.json();

        const currentUser = users.find((user: any) => user.email === credentials.email)

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login'
  }
}
