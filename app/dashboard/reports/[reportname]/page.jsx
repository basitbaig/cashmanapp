"use client";

import CashLedger from "@/app/reports/CashLedger";
import StudentLedger from "@/app/reports/StudentLedger";
import HeadwiseSummary from "@/app/reports/HeadwiseSummary";
import RejectEntries from "@/app/reports/RejectEntries";


export default function ReportName({params}) {
 
    const reportName = params.reportname

    return (
        <div className="content-center text-center">

            {
              reportName=="cashledger" && <CashLedger />          
            }

           {
               reportName=="studentledger" && <StudentLedger />          
            }

            {
                reportName=="headwisesummary" && <HeadwiseSummary /> 
            }

            {
                reportName=="rejectentry" && <RejectEntries /> 
            }



            {reportName=="pendingcash" &&             
                <div className="grid justify-items-center py-3">
                    <div className="wrapper">
                        <h1>Pending Cash Report</h1>
                    </div>
                </div>
            }

            {reportName=="rejectcash" &&              
                <div className="grid justify-items-center py-3">
                    <div className="wrapper">
                        <h1>Reject Cash Report </h1>
                    </div>
                </div>            
            }

            {reportName=="cancelcash" &&              
                <div className="grid justify-items-center py-3">
                    <div className="wrapper">
                        <h1>Cancel Cash Report </h1>
                    </div>
                </div>            
            }            
                            
        </div>
    )
}



//https://cdnjs.com/
//To get CDN Link for website for any library or bootstrap


