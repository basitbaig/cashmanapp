"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookies } from 'cookies-next';
export default function page() {
  const router = useRouter();
  const userinfo = getCookies();
 
  useEffect(() => {
    const checkusertype = decodeURIComponent(userinfo?.usertype);
    if (checkusertype == 'undefined') {
      router.replace('/');
    }    
  }, []);

 
    return (

      <div className="content-center text-center">
        Report Page
      </div>

    )
}

 