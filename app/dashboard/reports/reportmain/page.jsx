"use client";

import { getCookie } from 'cookies-next';
import { useState, useEffect } from "react";
import { getBranchCash } from '@/model/getdata'
import CashLedger from "@/app/reports/CashLedger";
import { useSearchParams } from 'next/navigation';
import { GiConsoleController } from 'react-icons/gi';

export default function page() {

    // {searchParams}
    // console.log(searchParams.rptname);
    const searchParams = useSearchParams();

    const reportName = searchParams.get('rptname');

    const branchid = getCookie('branchid');

    let branchdata=[]

    const CallBranchData = async () => {         
        branchdata = await getBranchCash({ branchid });  
        console.log('---Get Branch Data from API---')
        console.log(branchdata);
    }

     
    useEffect(() => {      
 
       CallBranchData();
 
    }, []); 

    // 
    return (
        <div>

            {reportName=="cashledger" && 
                branchdata.length >0 ? <CashLedger {...branchdata} /> : <h1>No Transaction Found..</h1>            
            }

            {reportName=="branchledger" &&             
                <div className="grid justify-items-center py-3">
                    <div className="wrapper">
                        <h1>Branch Ledger Report</h1>
                    </div>
                </div>
            }

            {reportName=="headledger" &&              
                <div className="grid justify-items-center py-3">
                    <div className="wrapper">
                        <h1>Head Ledger Report</h1>
                    </div>
                </div>            
            }
                            
        </div>
    )
}



//https://cdnjs.com/
//To get CDN Link for website for any library or bootstrap


