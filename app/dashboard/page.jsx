"use client";
//import { wait } from "@/lib/wait"
import LoginForm from "@/components/LoginForm";
import AdminDashboard  from "@/components/AdminDashboard";
import BranchDashboard  from "@/components/BranchDashboard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCookies } from 'cookies-next';
 
export default function Dashboard() {
   
  const router = useRouter();
  const userinfo = getCookies();

  // const { status } = useSession();

  // if (status !== "authenticated"){
  //   router.replace('/');     
  // }
 

  const checkusertype = decodeURIComponent(userinfo?.usertype);


  return (
    <>
      {
        checkusertype === "Branch" ? <BranchDashboard /> : checkusertype === "Finance" ? <AdminDashboard  /> : <LoginForm />
      }
     
    </>
  )
}

 