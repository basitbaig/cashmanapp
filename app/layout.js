import { Inter } from 'next/font/google'

import './globals.css'
import AuthProvider from '@/context/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cash Management System',
  description: 'Control and Manage Cash Handling and Movement at Branches and Head Office Fianance.',
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <AuthProvider>
        <body className={inter.className}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}




//https://www.material-tailwind.com/docs/html/guide/next