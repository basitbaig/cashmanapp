 
import { Inter } from 'next/font/google'
 
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cash Management System',
  description: 'Control and Manage Cash Handling and Movement at Branches and Head Office Fianance.',
};

export default function RootLayout({ children }) {

  //const pathName= usePathname();
  
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={inter.className}>               
             {children}        
      </body>
    </html>
  );
}




//https://www.material-tailwind.com/docs/html/guide/next