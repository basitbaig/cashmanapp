"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookies } from 'cookies-next';
export default function page() {
  const router = useRouter();
  const userinfo = getCookies();
  // const { status } = useSession();

  // if (status !== "authenticated"){
  //   router.replace('/');     
  // }

  
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

//https://www.youtube.com/watch?v=yK9lguddeSA

//https://www.youtube.com/watch?v=rJvZDWN_sNY&list=PLakmP0ibjfQcNNh7PnmIQ9zTm2bLM_wCC


//https://www.youtube.com/watch?v=ytYLlnDu9-8

//https://www.youtube.com/watch?v=Dc-HUp-iI4E
