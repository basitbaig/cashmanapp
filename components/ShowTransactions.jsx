"use client"

import { useState, useEffect, useCallback } from "react";
import { getallTransactions } from '@/service/getdata'
import { getBranchList } from '@/service/getdata'
import { cancelTransaction } from '@/service/getdata'
import { IconContext } from "react-icons";
import { Tooltip } from 'react-tooltip'
import { firstBy } from "thenby";
import { GiCancel, GiConsoleController } from "react-icons/gi";
import { getCookie } from 'cookies-next';
import { useTransaction } from '@/context/TransactionContext';
import classNames from 'classnames';

export default function ShowTransactions() {
 
  const [showMe, setShowMe] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [branchdata, SetbranchData] = useState([]);
  const [startdateFilter, setStartDateFilter] = useState(null)
  const [enddateFilter, setEndDateFilter] = useState(null)
  const { transactionTrigger, setTransactionTrigger } = useTransaction();

  let branchid = getCookie('branchid');
  const userrole = getCookie('userrole');

  const [callbranchid, SetCallBranchID] = useState(branchid);
  const [branchlist, Setbranchlist] = useState([]);

  const callBranchList = async () => {
      Setbranchlist(await getBranchList("all"));
    }

    const handleBranch = (e) => {
      e.preventDefault();
      

      branchid = e.target.value;

      SetCallBranchID(e.target.value);
 

      //getReportData();

    }
  
  const CallBranchData = async () => {

    const myBranchData = await getallTransactions({ branchid: callbranchid ? callbranchid : branchid });

    const adjustedEndDate = new Date(enddateFilter);

    // if (adjustedEndDate=="Thu Jan 01 1970 05:00:00 GMT+0500 (Pakistan Standard Time)")
    // {
    //   return;
    // }

    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);  // Add 1 day to the end date

    const data = myBranchData.filter(d => {
        var fdate = new Date(d.entrydate).getTime();
        
        return (
            fdate >= new Date(startdateFilter).getTime() && 
            fdate < adjustedEndDate.getTime()  // Use the adjusted end date
        );
    }).sort(
        firstBy(function (a, b) {
            return new Date(a.entrydate).getTime() - new Date(b.entrydate).getTime();
        }).thenBy("entrytype", "desc")
    );

   
    SetbranchData(data);
 
  }

  function getReportData() {
    CallBranchData();
  }

  useEffect(() => {
    // Call the function on the initial load
    if (initialLoad) {
      callBranchList();
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

 

  const CallCancelTransaction = async (transid) => {
    await cancelTransaction({ transid, callbranchid })
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



          <div className="mt-11">

          <div className="ml-10 mb-10">

              {userrole === "Admin" ? (


                <select
                  className="w-full max-w-xs text-black"
                  name="ubranchid"
                  required
                  onChange={handleBranch}
                >
                  {branchlist.map((opts, id) => (
                    <option key={id} value={opts.id}>
                      {opts.branchname}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-6 sm:gap-6 mb-5 ml-10">
                <div className="w-full">
                  <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                  <input type="date"
                    name="fromdate"
                    id="fromdate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="From Date"
                    required
                    onChange={(e) => setStartDateFilter(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="enddate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                  <input type="date"
                    name="enddate"
                    id="enddate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="To Date"
                    required
                    onChange={(e) => setEndDateFilter(e.target.value)}
                  />
                </div>

                <div className="w-full">
                    <button
                        className="mt-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                        type="button"
                        onClick={getReportData}
                      >
                        Show Transactions
                  </button>
                </div>

              </div>
 
          </div>


    


      {/* <div className="px-0.2 mt-1"> */}
      <div className={branchdata.length==0 ? "hidden" : "relative overflow-x-auto px-0.2 mt-2 ml-5 mr-5"}>

        <table className="table-fixed min-w-full text-left text-sm font-light">

          <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr className="border-b dark:border-neutral-500">
              <th className="px-4 py-2">S.No</th>
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
              branchdata.map((data, index) => {
                return <tr className={data.isreject || data.iscancel ? "border-b text-red-700" : data.isposted ? "border-b text-black-800" : "border-b dark:border-neutral-500"} key={data._id}>
                  <td className="whitespace-nowrap  px-3 py-2">{index+1}
                      {data.isreject ? "Rejected" : data.iscancel ? "Cancelled" :""}

                  </td>
                  <td className={data.isreject || data.iscancel ? "animate-bounce w-6 h-6 px-3 py-2" : "whitespace-nowrap px-3 py-2"}>{data.description + '\n' + data.remarks}</td>
                  <td className="whitespace-nowrap  px-3 py-2">{data.category}</td>
                  <td className="whitespace-nowrap  px-3 py-2">{formatDate(data.entrydate)}</td>
                  <td className="whitespace-nowrap  text-center">{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</td>
                  <td className="whitespace-nowrap  text-center">{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</td>
                  <td className="whitespace-nowrap  px-7 py-2">
                    {data.entrytype=="I" && data.isposted ?
                        <label>Posted</label>
                        :
                          <button onClick={() => { if (window.confirm('Are you sure to cancel this transaction?')) { handleCancel(data._id) }; }} data-tooltip-id="cancelbutton-tooltip">
                          <IconContext.Provider value={{ color: 'red', size: 22 }}>
                            <GiCancel />
                          </IconContext.Provider>
                        </button>
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
 