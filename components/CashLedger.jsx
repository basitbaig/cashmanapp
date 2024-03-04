"use client";

import { useState, useEffect } from "react";
import { getBranchCash } from '@/model/getdata'

export default function CashLedger({branchid}) {

  const [branchdata, SetbranchData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cashledger, SetcashLedger] = useState([]);

  const CallBranchData = async () => {

    if (branchdata.length == 0) {
      const data = await getBranchCash({ branchid });
      console.log(data);   
      SetbranchData(data); 
      console.log('---Branch Data----')
      console.log(branchdata);
    }

   
    

    let fromdate = new Date("2024-01-31");
    let todate = new Date();


    const getdata = branchdata.filter(item =>
      formatDate(item.entrydate) == fromdate
    );

    // SetcashLedger(getdata);
    // }



   

    //getReportData(fromdate);
  }

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

function getReportData(fromdate) {

    //   data.series = data.series.filter((item: any) =>
    //   item.date.getTime() >= fromDate.getTime() && item.date.getTime() <= toDate.getTime()
    // );   
    console.log(branchdata);
   
  SetcashLedger(                                                                                                                                                                                                                                                                      
      branchdata.filter(item =>
        item.entrydate.getTime() == fromdate.getTime()
    )
  );

  console.log(cashledger);

}
 
  useEffect(() => {  
   
    if (branchdata.length==0)
    {
      CallBranchData(); 
    }
      

}, []); 

 

    return (
        <div>
           
           <div className="grid justify-items-center py-3">
                <div className="wrapper">
                    Cash Ledger Report
                    <div className="border-x-slate-200">

                          <div className="ledger-report">
                              <div className="report-logo">
                                  {/* <img alt="logo" src={logo} /> */}
                              </div>
                              <h5>Cash Ledger Report</h5>
                              



                          </div>
                    </div>
                </div>
            </div>

        </div>

    );
}



//https://nextui.org/docs/components/table
