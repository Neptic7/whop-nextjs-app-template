import { Whop } from "@whop/sdk";

let _instance: Whop | null = null;

/**
 * Lazy-initialized Whop client. Called at request time, not at module load,
 * so Vercel build can succeed without env vars (they're only needed at runtime).
 */
export function getWhopsdk(): Whop {
	if (!_instance) {
		const apiKey = process.env.WHOP_API_KEY;
		if (!apiKey) {
			throw new Error(
				"WHOP_API_KEY is missing. Set it in Vercel: Project → Settings → Environment Variables, then redeploy."
			);
		}
		_instance = new Whop({
			appID: process.env.NEXT_PUBLIC_WHOP_APP_ID,
			apiKey,
			webhookKey: btoa(process.env.WHOP_WEBHOOK_SECRET || ""),
		});
	}
	return _instance;
}
