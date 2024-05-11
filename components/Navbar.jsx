"use client";

import Link from "next/link";
import DropDownAdmin from "./DropdownAdmin";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteCookie, getCookies, getCookie, hasCookie } from 'cookies-next';
import ReceivedCash from "./ReceivedCash";
import IssueCash from  "./IssueCash";
import { getCashTypes } from '@/service/getdata'
 
export default function Navbar() {

  const router = useRouter()
  const userinfo = getCookies();

  // const { status } = useSession();

  // if (status !== "authenticated"){
  //   router.push('/');     
  // }
  
  const branchid = getCookie('branchid');
  const username = getCookie('username');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');
 
  const isBoolean = typeof firstlogin === 'boolean';

  const [Recvheadlist, SetRecvheadlist]=useState([]);
  const [Issuheadlist, SetIssuheadlist]=useState([]);



  const CallDataTypes = async () => {

    let hmode = branchid==19 ? "H": "B";

    SetRecvheadlist(await getCashTypes("R",hmode));

    SetIssuheadlist(await getCashTypes("I",hmode));
  }

  const handleLogout = () => {
    removeCookie();    
  };

 
  useEffect(() => {
    
    CallDataTypes();
  
  }, []);
 
 

      // removing cookies
    const removeCookie = () => {
        //deleteCookies('userdata', { path: '/', });

        {
          hasCookie('username') &&
          deleteCookie('comid', { path: '/', });
          deleteCookie('username',  { path: '/', });
          deleteCookie('email', { path: '/', });
          deleteCookie('branchid',  { path: '/', });
          deleteCookie('usertype',{ path: '/', });
          deleteCookie('userrole',{ path: '/', });
          deleteCookie('firstlogin', { path: '/', }); 
      }
      //signOut();
        router.replace('/');
    };
 
  return (

    <nav className="flex justify-between items-center bg-slate-500 px-5 py-3">

      <Link className="text-white font-bold text-3xl" href={'/dashboard'}>Cash Management</Link>
      
      {/* username={decodeURIComponent(userdata?.name)}  */}
      <div className="float-right">
      
        <ul className="flex flex-row top-2">

  

          <li className="px-3">
            <ReceivedCash {...Recvheadlist} />
          </li>

          <li className="px-3">
            <IssueCash {...Issuheadlist} />
          </li>

          <li className="px-2 py-2">
            <Link className='rounded bg-blue-500 px-4 py-2.5 text-white hover:bg-blue-700' href={'/dashboard/reports'}>
              Reports
            </Link>
          </li>

          <li className="px-2">
            <div className="px-60">
              <span>
                {firstlogin === 'true' ? router.push('/updatepassword') : ""}
              </span>
              {userrole === "Admin" ? <DropDownAdmin /> : ""}
            </div>
          </li>

        </ul>

      
      </div>
      
 
      <div className="ml-2">
        <span className="flex text-white">{username}</span>

        {/* <Link className="flex text-white" href={'/'}>Logout</Link> */}

        <button className="flex text-white" onClick={handleLogout}>Sign out</button>
        
      </div>
          

    </nav >

   
  );
}