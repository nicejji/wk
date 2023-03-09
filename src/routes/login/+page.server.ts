import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

// WARN: Only for development, should be in .ENV file
// FIX: !!!
//
const secret = new TextEncoder().encode(
	'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);
const alg = 'HS256';

const createUser = async (name: string, password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const result = await prisma.user.create({
		data: { name, password: hash }
	});
	return result;
};

const createJWT = async (name: string) =>
	await new jose.SignJWT({ name })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setExpirationTime('2h')
		.sign(secret);

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const password = data.get('password')?.toString();

		// WARN: Name and password constrains should be checked on backend :)
		//
		if (!name || !password) {
			return fail(403, { incorrect: true });
		}
		const user = await prisma.user.findUnique({
			where: {
				name
			}
		});
		if (!user) {
			const user = await createUser(name, password);
			const jwt = await createJWT(user.name);
			cookies.set('token', jwt);
			throw redirect(303, '/me');
		}
		const validPassword = await bcrypt.compare(password, user.password);
		if (validPassword) {
			const jwt = await createJWT(user.name);
			cookies.set('token', jwt);
			throw redirect(303, '/me');
		}
		return fail(403, { incorrect: true });
	}
} satisfies Actions;
