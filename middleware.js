import { NextRequest, NextResponse} from 'next/server'
import { getCookies } from 'cookies-next';
export function middleware(req) {
    
     return NextResponse.next();
  }

 export const config = {
   matcher: ["/dashboard","/dashboard/userinfo","/dashboard/reports"], 
 }