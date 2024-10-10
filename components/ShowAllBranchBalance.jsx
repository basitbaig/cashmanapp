"use client";

import { useState, useEffect } from "react";
import { getAllBranchBalance } from '@/service/getdata'
import { useTransaction } from '@/context/TransactionContext';

export default function ShowAllBranchBalance() {

    const [branchbalance,Setbranchbalance]=useState([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const { transactionTrigger, setTransactionTrigger } = useTransaction();
 
    let grosstotal = 0;
     
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    const CallAllBranchBalance = async () => {
        Setbranchbalance(await getAllBranchBalance());
    }

    useEffect(() => {
        // Call the function on the initial load
        if (initialLoad) {
          CallAllBranchBalance();
          setInitialLoad(false);
        }
      }, [initialLoad]);
    
      useEffect(() => {
        if (transactionTrigger) {
          CallAllBranchBalance(); // Fetch data when a transaction occurs
          setTransactionTrigger(false); // Reset the trigger
        }
      }, [transactionTrigger]);    
     
     
 

    return (
        <div>
 
            <div className="px-5">
                <table className="table-fixed min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                        <tr className="border-b dark:border-neutral-500">
                            <th className="px-4 py-2">Branch Name</th>
                            <th className="px-4 py-2">Cash In Hand</th>
                        </tr>
                    </thead>
                    {/* <APIData /> */}
                    <tbody className="border-b dark:border-neutral-500">
                        {
                            branchbalance.map((item) => {
                                grosstotal += Number(item.balance);
                                return <tr className="border-b dark:border-neutral-500" key={item._id}>
                                    <td className="whitespace-nowrap  px-3 py-2">{item.Branch}</td>
                                    <td className="whitespace-nowrap  text-center">{formatNumber(item.balance)}</td>
                                </tr>
                                //grosstotal = grosstotal + {parseInt(item.balance)};                                                            
                            })
                        }
                        {branchbalance.length === 0 && (
                            <tr>
                               <td className="text-center">Branch Balance Not Available.</td>
                            </tr>
                        )}

                    </tbody>
                    <tfoot className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                        <tr>                                                                   
                            <th className="pl-5">Total Cash In Hand</th>
                            <td className="whitespace-nowrap text-center text-green">
                                {formatNumber(grosstotal)}
                            </td>        
                        </tr>
                    </tfoot>                    
                </table>
            </div>

        </div>

    );
}
