import { NextRequest, NextResponse} from 'next/server'
export function middleware(req) {
    //const nextUrl = req.nextUrl

    // if (nextUrl.pathname === '/dashboard') {
    //   if (req.cookies.authToken) {
    //     return NextResponse.rewrite(new URL('/auth/dashboard', req.url))
    //   } else {
    //     return NextResponse.rewrite(new URL('/public/dashboard', req.url))
    //   }
    // }

    //const cookie = req.cookies.get('username').valueOf();
    // const cookie = req.cookies.get('username');
     
     //To Get All Cookies
     //const allCookies = req.cookies

     //Checking Cookies Exist...

   //   if(!req.cookies.has('username')){
   //      console.log('Session Closed');
   //   }
     
     return NextResponse.next();
  }

//   export const config = {
//     matcher: '/',
//   }