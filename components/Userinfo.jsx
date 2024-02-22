"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getCookie, getCookies } from 'cookies-next';

export default function Userinfo() {
    
    const username = getCookie('username');
    const branchid = getCookie('branchid');
    const usertype = getCookie('usertype');
    const userrole = getCookie('userrole');
    const firstlogin = getCookie('firstlogin');

  return (
    
    <div className="md:container md:mx-auto">

      <div className="flex flex-col gap-2">

        <Navbar username={decodeURIComponent(username)} userrole={decodeURIComponent(userrole)} firstlogin={decodeURIComponent(firstlogin)} />

      </div>

      <div className="flex ">
         <h1>User information List</h1>        
      </div>

      <div>
         <Link href={'/dashboard'}>Back to Dashboard</Link>
      </div>


    </div>
  );
}

 