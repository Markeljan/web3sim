import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
	safelist: [
		// Layout & Display
		{
			pattern:
				/^(flex|grid|block|inline|hidden|justify-|items-|content-|align-|place-)/,
		},

		// Spacing (including negative values)
		{
			pattern: /^(-?)(p|m)(t|b|l|r|x|y)?-/,
		},

		// Sizing (width, height, min/max)
		{
			pattern: /^(w-|h-|min-w-|min-h-|max-w-|max-h-)/,
		},

		// Typography
		{
			pattern: /^(text-|font-|leading-|tracking-|whitespace-|break-|indent-)/,
		},

		// Colors (including opacity modifiers)
		{
			pattern:
				/^(text-|bg-|border-|ring-|placeholder-|from-|via-|to-|shadow-|accent-|caret-|fill-|stroke-)(.+)(\/[0-9]+)?$/,
		},

		// Borders & Divide
		{
			pattern: /^(rounded|border|divide-|outline-|ring-)/,
		},

		// Effects
		{
			pattern: /^(shadow|opacity|mix-blend-|backdrop-)/,
		},

		// Transitions & Animation
		{
			pattern: /^(transition|duration|ease|delay|animate)/,
		},

		// Transforms
		{
			pattern: /^(transform|scale|rotate|translate|skew|origin)/,
		},

		// Interactivity
		{
			pattern:
				/^(hover|focus|active|disabled|group-hover|focus-within|focus-visible|motion-safe|motion-reduce|print):/,
		},

		// Layout
		{
			pattern:
				/^(container|columns|object-|overflow-|overscroll-|position-|inset-|z-|float-|clear-|isolate)/,
		},

		// Flexbox & Grid
		{
			pattern: /^(flex-|order-|grid-|col-|row-|gap-|space-|auto-)/,
		},

		// Responsive Design (covers all breakpoints)
		{
			pattern: /^(sm|md|lg|xl|2xl):/,
		},

		// Aspect Ratio
		{
			pattern: /^aspect-/,
		},

		// SVG
		{
			pattern: /^(fill-|stroke-)/,
		},

		// Accessibility
		{
			pattern: /^(sr-|not-sr-)/,
		},

		// Tables
		{
			pattern: /^table-/,
		},

		// Lists
		{
			pattern: /^list-/,
		},

		// Sizing with arbitrary values
		{
			pattern: /^(w|h)-\[.+\]$/,
		},

		// Arbitrary properties
		{
			pattern: /^\[.+\]$/,
		},
	],
};
export default config;
