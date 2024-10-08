"use client"

import { useState, useEffect, useCallback } from "react";
import { getBranchCash } from '@/service/getdata'
import { cancelTransaction } from '@/service/getdata'
import { IconContext } from "react-icons";
import { Tooltip } from 'react-tooltip'
import { GiCancel } from "react-icons/gi";
import { getCookie } from 'cookies-next';
import { useTransaction } from '@/context/TransactionContext';
import classNames from 'classnames';

export default function ShowBranchDashboard({ branchid }) {

   
  //const [datasize, SetDatasize] = useState(0);
  const [showMe, setShowMe] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [branchdata, SetbranchData] = useState([]);
  const { transactionTrigger, setTransactionTrigger } = useTransaction();
  
  const CallBranchData = async () => {

    SetbranchData(await getBranchCash({ branchid }));

  }

  useEffect(() => {
    // Call the function on the initial load
    if (initialLoad) {
      CallBranchData();
      setInitialLoad(false);
    }
  }, [initialLoad]);

  useEffect(() => {
    if (transactionTrigger) {
      CallBranchData(); // Fetch data when a transaction occurs
      setTransactionTrigger(false); // Reset the trigger
    }
  }, [transactionTrigger]);

  

  //Listen for the Custom Event in the Dashboard:

  // useEffect(() => {
  //   const handleTransactionEvent = () => {
  //     CallBranchData(); // Fetch the latest data
  //   };
  
  //   window.addEventListener('transactionCompleted', handleTransactionEvent);
  
  //   return () => {
  //     window.removeEventListener('transactionCompleted', handleTransactionEvent);
  //   };
  // }, []);

 


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


      {/* <div className="px-0.2 mt-1"> */}
      <div className={branchdata.length==0 ? "hidden" : "relative overflow-x-auto px-0.2 mt-2"}>

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
                    {data.isposted==false && data.isreject==true ?
                        <button onClick={() => { if (window.confirm('Are you sure to cancel this transaction?')) { handleCancel(data._id) }; }} data-tooltip-id="cancelbutton-tooltip">
                          <IconContext.Provider value={{ color: 'red', size: 22 }}>
                            <GiCancel />
                          </IconContext.Provider>
                        </button>
                        :
                        <label>Posted</label>
                    }

                  </td>
                </tr>
              })
            }
            {branchdata.length === 0 && (
              <tr>
                 <td className="text-center">There is no Cash Collection.</td>
              </tr>
            )}

          </tbody>
        </table>

      </div>

    </div>
  );
}
 