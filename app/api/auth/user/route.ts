import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getWhopsdk } from '@/lib/whop-sdk';

/**
 * Returns the current Whop user ID from the request (cookies/headers).
 * Used by the app to key Supabase data by whop_user_id so data persists
 * across devices and cache clears.
 */
export async function GET() {
	try {
		const headersList = await headers();
		const { userId } = await getWhopsdk().verifyUserToken(headersList);

		if (!userId) {
			return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
		}

		return NextResponse.json({ userId });
	} catch (error) {
		console.error('Auth error:', error);
		return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
	}
}
