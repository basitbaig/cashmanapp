"use client";

import { useState, useEffect } from "react";


export default function CashLedger({...props}) {

  const branchdata = [...Object.values(props)];

  const [loader, setLoader] = useState(false);

  const [cashledger, SetcashLedger] = useState([]);

  const [startdateFilter, setStartDateFilter] = useState(null) 
  const [enddateFilter, setEndDateFilter] = useState(null) 

 
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

function getReportData() {

    //   data.series = data.series.filter((item: any) =>
    //   item.date.getTime() >= fromDate.getTime() && item.date.getTime() <= toDate.getTime()
    // );   
    
    let fromdate = new Date("2024-01-31");
    let todate = new Date("2024-01-31");

    setStartDateFilter(fromdate);
    setEndDateFilter(todate);
    
 
  const data = branchdata.filter(row => {
    let filterPass = true
    const date = new Date(row.entrydate)
    if (startdateFilter) {
      filterPass = filterPass && (date >= new Date(startdateFilter))
    }
    if (enddateFilter) {
      filterPass = filterPass && (date <= new Date(enddateFilter))
    }
    //if filterPass comes back `false` the row is filtered out
    return filterPass
  })

 
  SetcashLedger(data);

  console.log(cashledger);
 
}
 
useEffect(() => {

  if (cashledger.length==0)
  {
    getReportData();
  
  }                
}, [cashledger]);   



 

    return (
        <div>
           
           <div className="grid justify-items-center py-3">
                <div className="wrapper">
                    Cash Ledger Report
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                 
                  <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
                    <div className="w-full">
                      <label htmlFor="startdate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From Date</label>
                      <input type="date"
                        name="fromdate"
                        id="fromdate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="From Date"
                        required
                        onChange={(e) => setStartDateFilter(e.target.value)}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="enddate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To Date</label>
                      <input type="date"
                        name="enddate"
                        id="enddate"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="To Date"
                        required
                        onChange={(e) => setEndDateFilter(e.target.value)}
                      />
                    </div>

                  </div>

                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    type="button"
                    onClick={getReportData}
                  >
                    Show Report
                  </button>

              
              </div>
            </section>
 
                    <div className="border-x-slate-200">

                          <div className="ledger-report">
                              <div className="report-logo">
                                  {/* <img alt="logo" src={logo} /> */}
                              </div>
                              <h5>Cash Ledger Report</h5>

                              <table>
                                <tbody>
                                  {
                                    cashledger.map(row =>
                                      <tr>
                                        <td>row.remarks</td>
                                        <td>row.description</td>
                                        <td>row.entrydate</td>
                                        <td>row.totalamount</td>
                                      </tr>
                                    )

                                  }
                                </tbody>
                              </table>
                              
                          </div>
                    </div>
                </div>
            </div>

        </div>

    );
}



//https://nextui.org/docs/components/table



{/* <tbody>
{data
  .filter(row => {
    let filterPass = true
    const date = new Date(row.dateYouWannaFilterWith)
    if (dateFilter.startDate) {
      filterPass = filterPass && (new Date(dateFilter.startDate) < date)
    }
    if (dateFilter.endDate) {
      filterPass = filterPass && (new Date(dateFilter.endDate) > date)
    }
    //if filterPass comes back `false` the row is filtered out
    return filterPass
  })
    .map(row =>
      <tr>
        <td>Your</td>
        <td>Table</td>
        <td>Row</td>
        <td>Cells</td>
      </tr>
    )
}
</tbody > */}