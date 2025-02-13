import { heroui } from '@heroui/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							50: '#9EC9AA',
							200: '#77B388',
							600: '#2B4D34',
							DEFAULT: '#3F714D',
						},
						secondary: {
							DEFAULT: '#114B3D',
						},
						terciary: {
							500: '#87B573',
						},
						brokenwhite: {
							500: '#efeee5',
						},
						killarney: {
							DEFAULT: '#3F714D',
							50: '#9EC9AA',
							100: '#91C29F',
							200: '#77B388',
							300: '#5DA571',
							400: '#4E8B5F',
							500: '#3F714D',
							600: '#2B4D34',
							700: '#17291C',
							800: '#030503',
							900: '#000000',
							950: '#000000',
						},
					},
				},
			},
		}),
	],
};
