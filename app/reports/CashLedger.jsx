"use client";

import { useState, useEffect } from "react";
import { getBranchList } from '@/model/getdata'
import { getBranchCash } from '@/model/getdata'
import { getCookie } from 'cookies-next';
import { GiConsoleController } from 'react-icons/gi';
export default function CashLedger() {

  //const cashdata = [...Object.values(props)];

  //let branchdata =JSON.parse(JSON.stringify(cashdata))
 
  let branchid = getCookie('branchid');

  const [loader, setLoader] = useState(false);

  const [cashledger, SetcashLedger] = useState([]);
  const [callbranchid, SetCallBranchID] = useState(0);
  const [startdateFilter, setStartDateFilter] = useState(null)
  const [enddateFilter, setEndDateFilter] = useState(null)
  const [branchlist, Setbranchlist]=useState([]);  
  const [branchdata, Setbranchdata]=useState([]);

  const callBranchList = async () => {
    Setbranchlist(await getBranchList("all"));
  }

  const CallBranchData = async () => {    
    console.log(branchid);
    console.log(callbranchid);

     branchid = callbranchid != 0 ? callbranchid : branchid;

      const res = await getBranchCash({branchid});  

      Setbranchdata(res);   
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

  const handleBranch = (e) => {
    e.preventDefault();
    SetCallBranchID(e.target.value);
}

  function fnExcelReport() {
    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    var j = 0;
    var tab = document.getElementById('headerTable'); // id of table

    for (j = 0; j < tab.rows.length; j++) {
      tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
      //tab_text=tab_text+"</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var msie = window.navigator.userAgent.indexOf("MSIE ");

    // If Internet Explorer
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      txtArea1.document.open("txt/html", "replace");
      txtArea1.document.write(tab_text);
      txtArea1.document.close();
      txtArea1.focus();

      sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    } else {
      // other browser not tested on IE 11
      sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    }

    return sa;
  }

  function getReportData() {

    //   data.series = data.series.filter((item: any) =>
    //   item.date.getTime() >= fromDate.getTime() && item.date.getTime() <= toDate.getTime()
    // );  
    CallBranchData();
 
 
    // let fromdate = new Date("2024-03-01");
    // let todate = new Date("2024-03-07");

    // setStartDateFilter(fromdate);
    // setEndDateFilter(todate);


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
  }

  useEffect(() => {    
     
     branchid==19 && callBranchList();
 
  }, []);

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

              {branchid == 19 &&
                <div>
                  <select className="w-full max-w-xs text-black" name="ubranchid" required onChange={handleBranch}>
                    {
                      branchlist.map((opts, id) => <option key={id} value={opts.id}>{opts.branchname}</option>)
                    }
                  </select>
                </div>
              }

              <button
                className="mt-8 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" 
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

              <iframe id="txtArea1" style={{display:"none"}}></iframe>
             
              <button id="btnExport" onClick={fnExcelReport}> EXCEL </button>
              
              <table id="headerTable" className="table-fixed min-w-full text-left text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr className="border-b dark:border-neutral-500">
                  <th className="px-4 py-2">Transaction Date</th>
                  <th className="px-4 py-2">Transaction Details</th>
                  <th className="px-4 py-2">Amount Received</th>
                  <th className="px-4 py-2">Amount Issued</th>
                </tr>
              </thead>
              {/* <APIData /> */}
              {/* + '-' + data.entrytype */}
              <tbody className="border-b dark:border-neutral-500">

                {
                  cashledger.map((data) => {
                    return <tr className="border-b dark:border-neutral-500" key={data._id}>
                      <td className="whitespace-nowrap  px-3 py-2">{formatDate(data.entrydate)}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{data.category + '\n' + data.description + '\n' + data.remarks }</td>
                      <td className="whitespace-nowrap  text-center">{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</td>
                      <td className="whitespace-nowrap  text-center">{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</td>                                                        
                    </tr>
                  })
                }
                {cashledger.length === 0 && (
                  <p className="text-center">There is no Cash Collection.</p>
                )}
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


//https://datatables.net/extensions/buttons/examples/html5/simple.html


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