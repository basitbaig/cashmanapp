//import { useState, useEffect } from "react";
//import Userinfo from "@/components/Userinfo";

import Userinfo from "@/components/Userinfo";
//import { useRouter } from "next/navigation";
//import { setCookie, getCookie,getCookies } from 'cookies-next';

export default function page() {

  //const router = useRouter();
  //const userinfo = getCookies();

  //const [userlist, setUserList] = useState([]);

  // useEffect(() => {
  //   const checkUserType = decodeURIComponent(userinfo?.usertype);
  //   if (!checkUserType || checkUserType === 'undefined') {
  //     router.replace('/');  // Redirect to login if user type is invalid
  //     return;
  //   }
  //   callUserList();  // Fetch user list on component mount
  // }, []);  // Empty dependency array ensures this runs only on initial load


  return (
    <div>
      <Userinfo />
    </div>
  );
}
