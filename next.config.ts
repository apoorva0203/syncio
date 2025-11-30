import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cu.syncio.co",
				pathname: "/images/**",
			},
		],
	},
};

export default nextConfig;
