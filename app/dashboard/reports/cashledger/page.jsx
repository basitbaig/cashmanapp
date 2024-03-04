"use client";

import { getCookie } from 'cookies-next';
import CashLedger from "@/components/CashLedger";

export default function page() {

    const branchid = getCookie('branchid');

    return (
        <div>
            <CashLedger branchid={branchid} />                 
        </div>
    )
}



//https://cdnjs.com/
//To get CDN Link for website for any library or bootstrap


