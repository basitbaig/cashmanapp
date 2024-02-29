"use client";

import { useState, useEffect } from "react";
//import Userinfo from "@/components/Userinfo";
import { userInfo } from "@/model/getdata";
import Userinfo from "@/components/UserInfo";


export default function page() {

  const [userlist, SetuserList] = useState([]);

  const CallUserList = async () => {
    SetuserList(await userInfo());
  }

  useEffect(() => {
    CallUserList();
  }, []);


  return (
    <div>
      <Userinfo {...userlist} />
    </div>
  );
}
