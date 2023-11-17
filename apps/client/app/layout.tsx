import { Inter } from 'next/font/google';
import { Header } from '../components/header';
import { NiceModalProvider } from '../components/nice-modal-provider';
import './global.css';

export const metadata = {
  title: 'Welcome to client',
  description: 'Generated by create-nx-workspace',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  search,
}: {
  children: React.ReactNode;
  search: React.ReactNode;
}) {
  return (
    <NiceModalProvider>
      <html
        lang="en"
        className={`${inter.className} h-full w-full overflow-hidden text-center`}
      >
        <body className="flex h-full w-full flex-col overflow-hidden">
          <Header />
          <div className="flex h-full w-full flex-col overflow-hidden mx-auto max-w-screen-2xl">
            {search}
            {children}
          </div>
        </body>
      </html>
    </NiceModalProvider>
  );
}
