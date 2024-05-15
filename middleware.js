import { NextRequest, NextResponse} from 'next/server'
import { getCookies } from 'cookies-next';
export function middleware(req) {
  const sessionCookie = req.cookies.get('userrole')
  //req.cookies.set('new_cookie','my_new_cookie')
 
  if (req.nextUrl.pathname.startsWith('/dashboard')){
    if(!sessionCookie){
        return NextResponse.redirect(new URL('/', req.url))     
    }
  }
  
  if (sessionCookie.value == "User" && req.nextUrl.pathname.startsWith('/dashboard/userinfo')){

    return NextResponse.rewrite(new URL('/dashboard', req.url))

  } 
    //return NextResponse.next();
  }

 export const config = {
   matcher: ["/dashboard","/dashboard/userinfo","/dashboard/reports"], 
 }





//  export function middleware(req) {
//   const sessionCookie = req.cookies.get('session')
//   req.cookies.set('new_cookie','my_new_cookie')

//   if (req.nextUrl.pathname.startsWith('/dashboard')){
//     if(!sessionCookie){
//       return NextResponse.redirect('/login')
//     }
//   }
//    return NextResponse.next();
// }

// export const config = {
//  matcher: ["/dashboard","/dashboard/userinfo","/dashboard/reports"], 
// }