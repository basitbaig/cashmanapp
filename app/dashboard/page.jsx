"use client";

import AdminDashboard  from "@/components/AdminDashboard";
import BranchDashboard  from "@/components/BranchDashboard";
import { useRouter } from "next/navigation";
import { getCookie,getCookies } from 'cookies-next';
 
export default function Dashboard() {
   
  const router = useRouter();
  const userinfo = getCookies();

  const checkusertype = decodeURIComponent(userinfo?.usertype);
  
  // if (checkusertype == 'undefined')
  // {
  //    router.replace('/');
  // }
 
  return (
    <>
      {
        checkusertype === "Branch" ? <BranchDashboard /> : <AdminDashboard  />
      }
     
    </>
  )
}

 