"use client";

import { useState, useEffect } from "react"; 
import { getBranchBalance } from "@/model/getdata";

export function BranchHandBalance({ branchid })  {

    const [cashbalance, SetcashBalance] = useState([]);

    const CallCashBalance = async () => {
        SetcashBalance(await getBranchBalance({ branchid }));
    }

    useEffect(() => {
        CallCashBalance();
    }, [branchid, cashbalance]);

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

    // const [branchbalance, Setbranchbalance]=useState([]);
      
    //const branchbalance = await getBranchBalance({branchid});  
 
    return (
        <div className="float-right mt-3">
            <BranchHandBalance branchid={branchid} />
        </div>
    );
}


 
         