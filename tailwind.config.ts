import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/engine/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        pixel: '2px 2px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [],
};

export default config;
