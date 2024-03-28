"use client";
//import { wait } from "@/lib/wait"
import LoginForm from "@/components/LoginForm";
import AdminDashboard  from "@/components/AdminDashboard";
import BranchDashboard  from "@/components/BranchDashboard";
import { useRouter } from "next/navigation";
import { setCookie, getCookie,getCookies } from 'cookies-next';
 
export default function Dashboard() {
   
  const router = useRouter();
  const userinfo = getCookies();

  const checkusertype = decodeURIComponent(userinfo?.usertype);

 
 
  return (
    <>
      {
        checkusertype === "Branch" ? <BranchDashboard /> : checkusertype === "Finance" ? <AdminDashboard  /> : <LoginForm />
      }
     
    </>
  )
}

 