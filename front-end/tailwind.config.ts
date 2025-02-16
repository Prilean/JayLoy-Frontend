import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	"./layouts/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#3EB075',
  			secondary: '#86EFAC',
  			variant: '#D1F5DC',
  			black: '#0F172A',
  			background: '#F2F4F7',
  			white: '#FFFFFF',
  			red: '#DD0A0A',
			lightred: '#F25858',
  			purple: '#9747FF',
  			blue: '#304FFE',
			orange: '#FFAE4C',
  			indigo: '#5856D6',
  			pink: '#FF2D55',
  			green: '#34C759',
  			brown: '#A2845E',
  			mint: '#00C7BE',
  			cyan: '#32ADE6',
  			gray: '#909090',
			lightorange: '#FFD3B6',


			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
			},
  		},
		fontFamily: {
			"poppins": ["var(--font-poppins)"],
		},
  		// fontFamily: {
  		// 	Header: [
  		// 		'Poppins-Bold',
  		// 		'sans-serif'
  		// 	],
  		// 	Header2: [
  		// 		'Poppins-Bold',
  		// 		'sans-serif'
  		// 	],
  		// 	Description: [
  		// 		'Poppins-Medium',
  		// 		'sans-serif'
  		// 	],
  		// 	Description2: [
  		// 		'Poppins-Medium',
  		// 		'sans-serif'
  		// 	],
  		// 	smalltext: [
  		// 		'Poppins-Regular',
  		// 		'sans-serif'
  		// 	],
  		// 	extrasmall: [
  		// 		'Poppins-Regular',
  		// 		'sans-serif'
  		// 	]
  		// },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	require("daisyui"),
	require("@tailwindcss/typography"),
],
} satisfies Config;
