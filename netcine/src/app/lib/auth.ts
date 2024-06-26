import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db as prisma } from './db';
import bcrypt from 'bcrypt';
import type { Adapter } from 'next-auth/adapters';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma) as Adapter,
	providers: [
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENTID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialProvider({
			name: 'credencials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
				password: { label: 'Password', type: 'password' },
				username: { label: 'Name', type: 'text', placeholder: 'Vitor Marcelo' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) throw new Error('Dados de Login necessários.');
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user || !user.hashedPassword) {
					throw new Error('Usuário não registrado atráves de email/senha.');
				}
				const matchPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
				if (!matchPassword) throw new Error('Senha Incorreta.');
				return user;
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	debug: process.env.NODE_ENV === 'development',
};
