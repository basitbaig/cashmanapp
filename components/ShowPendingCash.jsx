"use client";

import { useState, useEffect } from "react";
import { pendingCash } from '@/model/getdata'
import PostPending from '@/components/PostPending';
import RejectPending from "./RejectPending";

export default function ShowPendingCash({branchid}) {

    const [pendingcash, Setpendingcash] = useState([]);
    //const pendingcash = await pendingCash({branchid});
 
    let grosstotal = 0;

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

    const CallPendingCash = async () => {
        Setpendingcash(await pendingCash({branchid}));
    }
     
    useEffect(() => {
    
        CallPendingCash();
      
      }, [pendingcash]);        


    return (

        <div>
             
            {/* {branchbalance.map(item => (
                <div key={item._id}>
                    <p className="text-lg decoration-indigo-500 bg-indigo-700 text-white font-bold">
                   Cash In Hand Balance: {formatNumber(item.balance)}
                    </p>
                </div>
            ))} */}

            {/* <div className="px-5"> */}

 
                <div className="relative overflow-x-auto">

                {parseInt(branchid)==19 &&
                    <table className="table-fixed min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr className="border-b dark:border-neutral-500">
                                <th className="px-4 py-2">Transaction-Id</th>
                                <th className="px-4 py-2">Branch</th>
                                <th className="px-4 py-2">Entry Date</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2 col-span-2">Status</th>
                            </tr>
                        </thead>
                 
                        <tbody className="border-b dark:border-neutral-500">
                            {
                                pendingcash.map((item) => {
                                    grosstotal += Number(item.totalamount);
                                    return <tr className="border-b dark:border-neutral-500" key={item._id}>
                                        <td className="whitespace-nowrap  px-3 py-2">{item._id}</td>
                                        <td className="whitespace-nowrap  px-3 py-2">{item.branchname}</td>
                                        <td className="whitespace-nowrap  px-3 py-2">{formatDate(item.entrydate)}</td>
                                        <td className="whitespace-nowrap  px-3 py-2">{item.description}</td>
                                        <td className="whitespace-nowrap  text-center">{formatNumber(item.totalamount)}</td>
                                        <td>
                                           <PostPending transid={item._id.toString()} />     
                                        </td>
                                        <td>
                                           <RejectPending transid={item._id.toString()} />   
                                        </td>
                                    </tr>
                                    //grosstotal = grosstotal + {parseInt(item.balance)};                                                            
                                })
                            }
                            {pendingcash.length === 0 && (
                                <p className="text-center">No Pending Transactions.</p>
                            )}
        
                        </tbody>
                        <tfoot className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr>
                                <th className="pl-5">Total Pending Cash</th>
                                <td className="col-span-2"></td>
                                <td className="col-span-2"></td>
                                <td className="col-span-2"></td>
                                <td className="whitespace-nowrap text-center text-green">
                                    {formatNumber(grosstotal)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                  }                    

                  {parseInt(branchid)!==19 &&
                    <table className="table-fixed min-w-full text-left text-sm font-light">
                        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr className="border-b dark:border-neutral-500">
                                <th className="px-4 py-2">Entry Date</th>
                                <th className="px-4 py-2">Pending Transactions</th>
                                <th className="px-4 py-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="border-b dark:border-neutral-500">
                            {
                                pendingcash.map((item) => {
                                    grosstotal += Number(item.totalamount);
                                    return <tr className="border-b dark:border-neutral-500" key={item._id}>
                                        <td className="whitespace-nowrap  px-3 py-2">{formatDate(item.entrydate)}</td>
                                        <td className="whitespace-nowrap  px-3 py-2">{item.description}</td>
                                        <td className="whitespace-nowrap  text-center">{formatNumber(item.totalamount)}</td>
                                    </tr>
                                    //grosstotal = grosstotal + {parseInt(item.balance)};                                                            
                                })
                            }
                            {pendingcash.length === 0 && (
                                <p className="text-center">No Pending Transactions.</p>
                            )}
        
                        </tbody>
                        <tfoot className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr>
                                <th>Total Pending Cash</th>
                                <td className="col-span-12"></td>
                                <td className="whitespace-nowrap text-center text-green">
                                    {formatNumber(grosstotal)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                  }                   

                </div>
 
        </div>

    );
}


 