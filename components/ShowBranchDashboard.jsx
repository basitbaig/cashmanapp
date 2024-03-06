"use client";

import { useState, useEffect } from "react";
import { getBranchCash } from '@/model/getdata'

export default function ShowBranchDashboard({branchid}) {

  const [branchdata, SetbranchData] = useState([]);

    const CallBranchData = async () => {
      SetbranchData(await getBranchCash({branchid}));
  }
   
  useEffect(() => {  
    CallBranchData(); 
    }, [branchid]);   


    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

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

    return (
        <div>
            {/* {branchbalance.map(item => (
                <div key={item._id}>
                    <p className="text-lg decoration-indigo-500 bg-indigo-700 text-white font-bold">
                   Cash In Hand Balance: {formatNumber(item.balance)}
                    </p>
                </div>
            ))} */}
        
            {/* <div className="px-0.2 mt-1"> */}
            <div className="relative overflow-x-auto px-0.2 mt-2">

            <table className="table-fixed min-w-full text-left text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr className="border-b dark:border-neutral-500">
                  <th className="px-4 py-2">Transaction Details</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Transaction Date</th>
                  <th className="px-4 py-2">Amount Received</th>
                  <th className="px-4 py-2">Amount Issued</th>
                </tr>
              </thead>
              {/* <APIData /> */}
              {/* + '-' + data.entrytype */}
              <tbody className="border-b dark:border-neutral-500">

                {
                  branchdata.map((data) => {
                    return <tr className="border-b dark:border-neutral-500" key={data.id}>
                      <td className="whitespace-nowrap  px-3 py-2">{data.description + '\n' + data.remarks }</td>
                      <td className="whitespace-nowrap  px-3 py-2">{data.category}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{formatDate(data.entrydate)}</td>
                      <td className="whitespace-nowrap  text-center">{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</td>
                      <td className="whitespace-nowrap  text-center">{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</td>
                    </tr>
                  })
                }
                {branchdata.length === 0 && (
                  <p className="text-center">There is no Cash Collection.</p>
                )}


                {/* <tr>
                                <td className="border px-4 py-2">Intro to CSS</td>
                                <td className="border px-4 py-2">Adam</td>
                                <td className="border px-4 py-2">858</td>
                            </tr> */}

              </tbody>
            </table>




            </div>

        </div>

    );
}



//https://nextui.org/docs/components/table
