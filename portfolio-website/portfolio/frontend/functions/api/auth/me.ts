import { isAdmin, json, type Context } from '../../_shared';
export const onRequestGet = async ({ request, env }: Context) => json({ authenticated: await isAdmin(request, env) });
