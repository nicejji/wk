import { fail } from '@sveltejs/kit';
import type { Action } from './$types';

export const actions = {
	default: async (event) => {
		return fail(403, { incorrect: true });
	}
} satisfies Action;
