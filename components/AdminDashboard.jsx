"use client";

 
import ShowBranchBalance from "@/components/ShowBranchBalance";
import ShowAllBranchBalance from "@/components/ShowAllBranchBalance";
import ShowBranchDashboard from "@/components/ShowBranchDashboard";
import ShowPendingCash from "@/components/ShowPendingCash";
// import { getServerSession  } from "next-auth/next";
// import { authOptions } from "@app/api/auth/[...nextauth]"; // ⚠️ Make sure this is the correct path
// import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getBranchList } from '@/service/getdata'
import { pendingCash } from '@/service/getdata'
import { setCookie,getCookie, getCookies } from 'cookies-next';
import TestTypeWritter from "./TestTypeWritter";

export default function AdminDashboard() {

  const username = getCookie('username');
  const branchid = getCookie('branchid');
  const usertype = getCookie('usertype');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');
 
  const [showMe, setShowMe] = useState(false);
  const [callbranchid, SetCallBranchID] = useState(0);
  const [branchlist, Setbranchlist]=useState([]);  
  
  const [totalpending, SetTotalpending]=useState(0);
  
  let pendingcount="";

  function toggle(e){
    e.preventDefault();
    
    setShowMe(!showMe);
  }

  const callBranchList = async () => {
    Setbranchlist(await getBranchList("all"));

    if (totalpending=="")
    {   
      CallPendingCash();           
    }
  }

  const CallPendingCash = async () => {
  
    const pendData = await pendingCash({branchid})

    pendingcount=pendData.length;   
    
    SetPendingTag();
 
  }  

  function SetPendingTag() {    
    SetTotalpending(pendingcount);  
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
 
}
 
  return (

    <div className="md:container md:mx-auto">
 
    {/* <TestTypeWritter /> */}

    
      <div className="flex bg-gray-200 min-h-screen">

        <div className="px-4 mt-10 w-full justify-center items-center min-h-screen hidden lg:block">

          <div className="w-full bg-gray-400 p-2 rounded-md shadow-2xl hidden lg:block">

            <div className="w-full mt-5 hidden lg:block">
              <ShowAllBranchBalance />
            </div>


          </div>
        </div>


        <div className="mt-5">

          {/* animate-blinkingBg */}
          {totalpending > 0 &&
                <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={toggle}>
                  {showMe ? "Hide Pending Entries" : "Show Pending Entries"}

                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{totalpending}</div>
                </button>
              }

            
              <div style={{ display: showMe ? "block" : "none" }}>
            
                <ShowPendingCash branchid={decodeURIComponent(branchid)} />
              
              </div>  


          <div className="flex flex-col w-full justify-between items-center min-h-screen ">

            <div className="flex flex-col w-full bg-slate-200 p-4 rounded-md shadow-2xl my-2">
            
              <div className="mt-11">
                <div>
                  <select className="w-full max-w-xs text-black" name="ubranchid" required onChange={handleBranch}>
                    {
                      branchlist.map((opts, id) => <option key={id} value={opts.id}>{opts.branchname}</option>)
                    }
                  </select>

                  <div className="float-right">
                    {callbranchid != 0 ?
                      <ShowBranchBalance branchid={callbranchid} />
                      :
                      <ShowBranchBalance branchid={decodeURIComponent(branchid)} />
                    }
                  </div>

                </div>

                {callbranchid != 0 ?
                  <ShowBranchDashboard branchid={callbranchid} />
                  :
                  <ShowBranchDashboard branchid={decodeURIComponent(branchid)} />
                }

              </div>

            </div>
          </div> 



        </div>

      </div>

    </div>
  );
}


 