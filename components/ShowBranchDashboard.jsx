"use client";

import { useState, useEffect } from "react";
import { getBranchCash } from '@/model/getdata'
import { cancelTransaction } from '@/model/getdata'
import { IconContext } from "react-icons";
import { Tooltip } from 'react-tooltip'
import { GiCancel } from "react-icons/gi";

export default function ShowBranchDashboard({ branchid }) {

  const [branchdata, SetbranchData] = useState([]);

  const CallBranchData = async () => {
    SetbranchData(await getBranchCash({ branchid }));
  }

  useEffect(() => {
    CallBranchData();
  }, [branchid]);

  const CallCancelTransaction = async (transid) => {
    await cancelTransaction({ transid, branchid })
  }

  function handleCancel(transid) {
    //e.preventDefault();
    CallCancelTransaction(transid)
  };


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

      <Tooltip
        id="cancelbutton-tooltip"
        place="top"
        content="Cancel This Transaction"
      />
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
              <th className="px-5 py-1">Action</th>
            </tr>
          </thead>
          {/* <APIData /> */}
          {/* + '-' + data.entrytype */}
          <tbody className="border-b dark:border-neutral-500">

            {
              branchdata.map((data) => {
                return <tr className={data.isreject ? "border-b text-red-700" : data.isposted ? "border-b text-black-800" : "border-b dark:border-neutral-500"} key={data._id}>
                  <td className={data.isreject ? "animate-bounce w-6 h-6 px-3 py-2" : "whitespace-nowrap px-3 py-2"}>{data.description + '\n' + data.remarks}</td>
                  <td className="whitespace-nowrap  px-3 py-2">{data.category}</td>
                  <td className="whitespace-nowrap  px-3 py-2">{formatDate(data.entrydate)}</td>
                  <td className="whitespace-nowrap  text-center">{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</td>
                  <td className="whitespace-nowrap  text-center">{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</td>
                  <td className="whitespace-nowrap  px-7 py-2">

                    <button onClick={() => { if (window.confirm('Are you sure to cancel this transaction?')) { handleCancel(data._id) }; }} data-tooltip-id="cancelbutton-tooltip">
                      <IconContext.Provider value={{ color: 'red', size: 22 }}>
                        <GiCancel />
                      </IconContext.Provider>
                    </button>



                    {/* <CancelTransaction transid={data._id.toString()} branchid={branchid} />   */}

                  </td>
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



// <div className="flex flex-col w-full justify-center items-center min-h-px ">
// Branch Cash Transactions
// <div className="flex flex-col w-10/12 bg-gray-900 p-4 rounded-md shadow-2xl my-4">
//   <div className="text-white w-full flex justify-between px-4 opacity-50 mb-2">
//     <div>Transaction Detail</div>
//     <div>Category</div>
//     <div>Date</div>
//     <div>Received</div>
//     <div>Issued</div>
//     <div>Action</div>
//   </div>
//   {
//    branchdata.map((data, idx) => {   
//     return (        
//     <>           
//       <div className={`${idx === 0 ? "rounded-t-md" : branchdata.length - 1 === idx ? "rounded-b-md" : ""} bg-gray-800 cursor-pointer text-white hover:bg-gray-700 shadow-md flex w-full justify-between p-4`}>
//         <div className={`${data.isreject ? "animate-bounce truncate" : "truncate"}`}> {data.description + '\n' + data.remarks}</div>
//         <div>{data.category}</div>
//         <div>{formatDate(data.entrydate)}</div>
//         <div>{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</div>
//         <div>{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</div>
//         <div>
//           <button onClick={() => { if (window.confirm('Are you sure to cancel this transaction?')) { handleCancel(data._id) }; }} data-tooltip-id="cancelbutton-tooltip">
//             <IconContext.Provider value={{ color: 'red', size: 22 }}>
//               <GiCancel />
//             </IconContext.Provider>
//           </button>
//         </div>
//       </div>
//     </>
//     )
//   })}
// </div>
// </div>