"use client";

import Navbar from "@/components/Navbar";
import ShowBranchBalance from "@/components/ShowBranchBalance";
import ShowAllBranchBalance from "@/components/ShowAllBranchBalance";
import ShowBranchDashboard from "@/components/ShowBranchDashboard";
import ShowPendingCash from "@/components/ShowPendingCash";
// import { getServerSession  } from "next-auth/next";
// import { authOptions } from "@app/api/auth/[...nextauth]"; // ⚠️ Make sure this is the correct path
// import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getBranchList } from '@/model/getdata'
import { getCookie, getCookies } from 'cookies-next';

export default function AdminDashboard() {

  //const { data: token, status } = useSession();

  //const session = await getServerSession(authOptions);


  // const [callapi, SetCallApi] = useState(true);
 
  const username = getCookie('username');
  const branchid = getCookie('branchid');
  const usertype = getCookie('usertype');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');
 
  const [showMe, setShowMe] = useState(false);

  const [branchlist, Setbranchlist]=useState([]);

  function toggle(e){
    e.preventDefault();
    
    setShowMe(!showMe);
  }

  const [callbranchid, SetCallBranchID] = useState(0);
  
  const callBranchList = async () => {
    Setbranchlist(await getBranchList("all"));
  }

  useEffect(() => {    
    callBranchList();
  }, []);

  //Make Coma Separated Number
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }



  const handleBranch = (e) => {
    e.preventDefault();
 
    SetCallBranchID(e.target.value);

    // let utyp = e.target.value == 19 ? "Finance" : "Branch";

    // setUserType(utyp);

    // const brhcomp = branchlist.find((bl) => bl.id == e.target.value);

    // setComID(brhcomp.comid);
 
}
 
  return (

    <div className="md:container md:mx-auto">

      <div className="flex flex-col gap-2">
        {/* <Navbar username={token.user?._doc?.name} userrole={token.user?._doc?.userrole} firstlogin={token.user?._doc?.firstlogin}/>             */}

        <Navbar username={decodeURIComponent(username)} userrole={decodeURIComponent(userrole)} firstlogin={decodeURIComponent(firstlogin)} />

      </div>

 
      <div className="flex bg-gray-200 min-h-screen">

        {/* <div className="w-1/4 mt-11">
          <ShowAllBranchBalance />
        </div> */}

        <div className="mt-5">

          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={toggle}>{showMe ? "Hide Pending Entries" : "Show Pending Entries"}</button>

          {/* <div style={{ display: showMe ? "block" : "none" }}>
        
            <ShowPendingCash branchid={decodeURIComponent(branchid)} />
          
          </div> */}

          {callbranchid != 0 ?
            <ShowBranchBalance branchid={callbranchid} />
            :
            <ShowBranchBalance branchid={decodeURIComponent(branchid)} />
          }

          <div className="mt-11">
            <div className="flex ">
              <select className="w-full max-w-xs text-black" name="ubranchid" required onChange={handleBranch}>
                {
                  branchlist.map((opts, id) => <option key={id} value={opts.id}>{opts.branchname}</option>)
                }
              </select>
            </div>
            {/* {callbranchid != 0 ?
              <ShowBranchDashboard branchid={callbranchid} />
              :
              <ShowBranchDashboard branchid={decodeURIComponent(branchid)} />
            } */}
          </div>
        </div>

      </div>

    </div>
  );
}


// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention