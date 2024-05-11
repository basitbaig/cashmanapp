"use client";

import { getCookie, getCookies } from 'cookies-next';
import {updateUser} from "@/service/getdata";

export default function UserList({...props}) {
  
    const userinfo = getCookies();
    const username = getCookie('username');
 
    const userlist = [...Object.values(props)];

    const data = userlist;

    

}