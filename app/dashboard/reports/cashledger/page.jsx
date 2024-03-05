"use client";

import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { getBranchCash } from '@/model/getdata'
import CashLedger from "@/components/CashLedger";

export default function page() {
    
    const branchid = getCookie('branchid');

    const [branchdata, SetbranchData] = useState([]);

    const CallBranchData = async () => {      
          
        const data = await getBranchCash({ branchid });

        SetbranchData(data);
       
    }
    
    useEffect(() => {      
 
       CallBranchData();
 
    }, []); 

    return (
        <div>
            <CashLedger {...branchdata}  />                 
        </div>
    )
}



//https://cdnjs.com/
//To get CDN Link for website for any library or bootstrap


