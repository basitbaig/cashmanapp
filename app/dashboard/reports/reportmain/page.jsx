"use client";

import CashLedger from "@/app/reports/CashLedger";
import { useSearchParams } from 'next/navigation';

export default function page() {

    // {searchParams}
    // console.log(searchParams.rptname);
    const searchParams = useSearchParams();

    const reportName = searchParams.get('rptname');

    return (
        <div className="content-center text-center">

            {
              reportName=="cashledger" && <CashLedger />          
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


