/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		// https://docs.walletconnect.com/appkit/next/core/installation#extra-configuration
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},
};

export default nextConfig;
