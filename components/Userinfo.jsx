"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getCookie, getCookies } from 'cookies-next';
import { userInfo } from "@/model/getdata";

export default async function Userinfo() {
    
    const username = getCookie('username');
    const branchid = getCookie('branchid');
    const usertype = getCookie('usertype');
    const userrole = getCookie('userrole');
    const firstlogin = getCookie('firstlogin');

    const userlist = await userInfo();

  return (
    
    <div className="md:container md:mx-auto">

      <div className="flex flex-col gap-2">

        <Navbar username={decodeURIComponent(username)} userrole={decodeURIComponent(userrole)} firstlogin={decodeURIComponent(firstlogin)} />

      </div>

 
        <div className="relative overflow-x-auto mt-8">
 
          <table className="table-fixed min-w-full text-left text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr className="border-b dark:border-neutral-500">
                  <th className="px-4 py-2">Branch</th>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">User Role</th>
                  <th className="px-4 py-2">User Type</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>

              <tbody className="border-b dark:border-neutral-500">
                {
                  userlist.map((item) => {
                    
                    return <tr className="border-b dark:border-neutral-500" key={item._id}>
                      <td className="whitespace-nowrap  px-3 py-2">{item.branchname}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.name}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.email}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.userrole}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.usertype}</td>
                      <td>
                      {item.isactive ? "Active" : "InActive"}
                        {/* <PostPending transid={item._id.toString()} /> */}
                      </td>
                    </tr>                                                        
                  })
                }
                {userlist.length === 0 && (
                  <p className="text-center">No User Record.</p>
                )}

              </tbody>
 
            </table>
          
        </div>

    </div>
  );
}

 