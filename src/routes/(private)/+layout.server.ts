import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import * as jose from 'jose';
import type { LayoutServerLoad } from './$types';

const secret = new TextEncoder().encode(
	'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

export const load = (async ({ cookies }) => {
	try {
		const token = cookies.get('token') || '';
		const { payload } = await jose.jwtVerify(token, secret);
		const user = await prisma.user.findUnique({
			where: { name: payload?.name as string }
		});
		return { user };
	} catch (err) {
		throw redirect(303, '/login');
	}
}) satisfies LayoutServerLoad;
