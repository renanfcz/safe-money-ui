import '../styles/global.css';

import { Inter } from '@next/font/google';

import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="dark:bg-slate-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
