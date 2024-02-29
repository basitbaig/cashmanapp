"use client";

import AdminDashboard  from "@/components/AdminDashboard";
import BranchDashboard  from "@/components/BranchDashboard";

import { getCookie,getCookies } from 'cookies-next';
 
export default function Dashboard() {
   

  const userinfo = getCookies();

  const checkusertype = decodeURIComponent(userinfo?.usertype);
  
 
  return (
    <>
      {
        checkusertype === "Branch" ?   <BranchDashboard  /> :   <AdminDashboard  />
      }
     
    </>
  )
}

 