import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Trijam - 246',
  description: 'Theme: "Beep, beep"',
};

type Props = { children: React.ReactNode };

const RootLayout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
