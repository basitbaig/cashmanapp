"use client";

import { useState, useEffect } from "react";
//import Userinfo from "@/components/Userinfo";
import { userInfo } from "@/model/getdata";
import Userinfo from "@/components/Userinfo";
import { useRouter } from "next/navigation";
import { setCookie, getCookie,getCookies } from 'cookies-next';

export default function page() {

  const router = useRouter();
  const userinfo = getCookies();

  const [userlist, SetuserList] = useState([]);

  const CallUserList = async () => {
    SetuserList(await userInfo());
  }

  useEffect(() => {
    const checkusertype = decodeURIComponent(userinfo?.usertype);
    if (checkusertype == 'undefined') {
      router.replace('/');
    }
    CallUserList();
  }, []);


  return (
    <div>
      <Userinfo {...userlist} />
    </div>
  );
}
