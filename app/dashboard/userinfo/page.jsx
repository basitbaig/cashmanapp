"use client";

import { useState, useEffect } from "react";
//import Userinfo from "@/components/Userinfo";
import { userInfo } from "@/service/getdata";
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
    const checkuserrole = decodeURIComponent(userinfo?.userrole);
    if (checkusertype == 'undefined' || checkuserrole == 'User') {
      router.replace('/');
    }
    CallUserList();
  }, [userlist]);


  return (
    <div>
      <Userinfo {...userlist} />
    </div>
  );
}
