"use client";

import Navbar from "@/components/Navbar";
import ShowBranchBalance from "@/components/ShowBranchBalance";
import ShowBranchDashboard from "@/components/ShowBranchDashboard";
import ShowPendingCash from "@/components/ShowPendingCash";
import { useState, useEffect } from "react";
import { pendingCash } from '@/service/getdata'
 
import { setCookie, getCookie, getCookies } from 'cookies-next';
 

export default function BranchDashboard() {
 
  const username = getCookie('username');
  const branchid = getCookie('branchid');
  const usertype = getCookie('usertype');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');

  const [showMe, setShowMe] = useState(false);
  const [pendingcash, Setpendingcash] = useState([]);

  let pendingcount = "";

  const [totalpending, SetTotalpending] = useState(0);


  const CallPendingCash = async () => {

    const pendData = await pendingCash({ branchid });

    pendingcount = pendData.length;

    SetPendingTag();

  }

  function SetPendingTag() {
    SetTotalpending(pendingcount);
  }


  function toggle(e) {
    e.preventDefault();
    setShowMe(!showMe);
  }

  function refreshMyPage() {
    window.location.reload();
  }

  useEffect(() => {
    CallPendingCash();

  }, []);

  //Format Data as per Customize Style
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }

  //Make Coma Separated Number
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  return (

    <div className="md:container md:mx-auto">
 

      <div className="bg-gray-200 min-h-screen">

        <div className="max-w-8xl mx-auto px-8 py-8">

          {totalpending > 0 &&
            <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={toggle}>
              {showMe ? "Hide Pending Entries" : "Show Pending Entries"}

              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{totalpending}</div>
            </button>
          }



          <div style={{ display: showMe ? "block" : "none" }}>
     


            <ShowPendingCash branchid={decodeURIComponent(branchid)} />


            {/* </div> */}
          </div>



          {/* <div className="w-3/4"> */}

          <div className="flex flex-col w-full justify-center items-center min-h-px ">

            <div className="flex flex-col w-full bg-gray-400 p-4 rounded-md shadow-2xl my-4">

              <div className="float-right {showMe ? mt-1 : mt-0}">
                <ShowBranchBalance branchid={decodeURIComponent(branchid)} />
              </div>

              <div className="{showMe ? mt-11 : mt-0}">
                <ShowBranchDashboard branchid={decodeURIComponent(branchid)} />
              </div>


            </div>
          </div>

          {/* </div> */}

        </div>
      </div>
    </div>
  );
}

 