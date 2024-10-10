"use client";

import { useState, useEffect } from "react"; 
import { getBranchBalance } from "@/service/getdata";
import { useTransaction } from '@/context/TransactionContext';

export function BranchHandBalance({ branchid })  {

    const [cashbalance, SetcashBalance] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const { transactionTrigger, setTransactionTrigger } = useTransaction();

    const CallCashBalance = async () => {
        SetcashBalance(await getBranchBalance({ branchid }));
    }

    useEffect(() => {
        // Call the function on the initial load
        if (initialLoad) {
          CallCashBalance();
          setInitialLoad(false);
        }
      }, [initialLoad]);
    
      useEffect(() => {
        if (transactionTrigger) {
          CallCashBalance(); // Fetch data when a transaction occurs
          setTransactionTrigger(false); // Reset the trigger
        }
      }, [branchid,transactionTrigger]);

  

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }


    return (
        <>
            {cashbalance.map(item => (
                <div key={item._id}>
                    <p className="text-lg bg-slate-600 text-white font-bold">
                        Cash In Hand Balance: {formatNumber(item.balance)}
                    </p>
                </div>
            ))}
        </>
    )


}
 

export default function ShowBranchBalance ({branchid}) {
 
    return (
        <div className="float-right mt-3">
            <BranchHandBalance branchid={branchid} />
        </div>
    );
}


 
         