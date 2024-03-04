"use client";

import Link from "next/link";
import DropDownAdmin from "./DropdownAdmin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { deleteCookie, getCookies, getCookie } from 'cookies-next';
import ReceivedCash from "./ReceivedCash";
import IssueCash from  "./IssueCash";
import { getCashTypes } from '@/model/getdata'
 
export default function Navbar() {

  const userinfo = getCookies();
  
  const username = getCookie('username');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');
 
  const isBoolean = typeof firstlogin === 'boolean';

  const [Recvheadlist, SetRecvheadlist]=useState([]);
  const [Issuheadlist, SetIssuheadlist]=useState([]);

  const router = useRouter()

  const CallDataTypes = async () => {
    SetRecvheadlist(await getCashTypes("R"));

    SetIssuheadlist(await getCashTypes("I"));
  }
 
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
      

      {/* <Link className="bg-white p-2" href={'/issueCash'}>Issue Cash</Link> */}

      

      {/* <Link className="bg-white p-2" href={'/receivecash'}>Receive Cash</Link>
      <Link className="bg-white p-2" href={'/issuecash'}>Issue Cash</Link> */}



      <div className="ml-2">
        <span className="flex text-white">{username}</span>

        <Link className="flex text-white" href={'/'}>Logout</Link>
        
      </div>
          

    </nav >

   
  );
}