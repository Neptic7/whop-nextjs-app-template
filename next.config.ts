import { withWhopAppConfig } from "@whop/react/next.config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						// Allow Whop (and any company subdomains) to embed this app in an iframe
						key: "Content-Security-Policy",
						value: "frame-ancestors *;",
					},
				],
			},
		];
	},
};

export default withWhopAppConfig(nextConfig);
