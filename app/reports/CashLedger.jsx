"use client";

import { useState, useEffect, useRef } from "react";
import { getBranchList, getCashTypes } from '@/service/getdata'
import { getReportCash } from '@/service/getdata'
import { getCookie } from 'cookies-next';
import { firstBy } from "thenby";
import { RiFileExcel2Line } from "react-icons/ri";
import { GrPrint } from "react-icons/gr";
import { useReactToPrint } from 'react-to-print';


export default function CashLedger() {

 //https://stackoverflow.com/questions/tagged/react-to-print
 //https://medium.com/readytowork-org/adding-a-header-footer-on-every-print-page-in-a-react-app-66ceccf9b35c

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    
    pageStyle: `@media all {
        .page-break {
          display: none;
        }
      }
      @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
        }
      }

      @media print {
        .page-break {
          margin-top: 1rem;
          display: block;
          page-break-before: auto;
        }
      }

      @page {
        size: auto;
        margin: 5mm;
      }`,
  content: () => componentRef.current,
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),  
    removeAfterPrint: true,
  });


  let branchid = getCookie('branchid');
  const reportbranchid = getCookie('branchid')

  const [loader, setLoader] = useState(false);
  const [showMe, setShowMe] = useState('none');
  const [cashledger, SetcashLedger] = useState([]);
  const [callbranchid, SetCallBranchID] = useState(0);
  const [branchname, Setbranchname] = useState(branchid == 19 ? "Head Office - Finance" : "");
  let selectbranch = branchid == 19 ? "Head Office - Finance" : "";
  const [callcashhead, SetCallCashHead] = useState("");
  const [startdateFilter, setStartDateFilter] = useState(null)
  const [enddateFilter, setEndDateFilter] = useState(null)
  const [branchlist, Setbranchlist] = useState([]);
  const [headlist, Setheadlist] = useState([]);
  const [branchdata, Setbranchdata] = useState([]);
  const [opbalance, Setopbalance]=useState(0);
  const [showbranchlist, Setshowbranchlist] = useState('none');
  const [showheadlist, Setshowheadlist] = useState('none');

  let balance = 0;
  let opbal = 0;
   

  const callBranchList = async () => {
    Setbranchlist(await getBranchList("all"));
  }

  const CallBranchData = async () => {

    branchid = parseInt(callbranchid) != 0 ? callbranchid : branchid;
    const report = "ledger";
    const feehead = callcashhead == "Select Cash Head" ? "undefined" : callcashhead
    const res = await getReportCash({ branchid, feehead, report });
    Setbranchdata(res);
    //Setbranchname(selectbranch);   
  }

  const CallHeadList = async () => {
    branchid = callbranchid != 0 ? callbranchid : branchid;
    let hmode = branchid == 19 || branchid == 0 ? "H" : "B";
    let htype = "undefined";
    const res = await getCashTypes(htype, hmode)
    Setheadlist(res);
 

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

    Setbranchname(e.target.value == 0 ? "Head Office - Finance" : e.target.options[e.target.selectedIndex].text)
    selectbranch = e.target.options[e.target.selectedIndex].text
    CallHeadList();
  }

  const handleCashHead = (e) => {
    e.preventDefault();
    SetCallCashHead(e.target.value);
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

  function getOpeningBalance() {

    const balancedata = branchdata.filter(d => {
       
      var fdate = new Date(d.entrydate).getTime()
 
      return (fdate < new Date(startdateFilter).getTime());
     }).sort(firstBy(function (a, b) {
      return new Date(a.entrydate).getTime() - new Date(b.entrydate).getTime()
    }));

  
    balancedata.map((data) => {
      { 

        data.entrytype === "R" ? opbal += Number(data.totalamount) : opbal -= Number(data.totalamount) 
      
      }

      })

      Setopbalance(opbal);

      balance = opbal;
    }

  function getReportData() {
    const adjustedEndDate = new Date(enddateFilter);
    adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);  // Add 1 day to the end date

    const data = branchdata.filter(d => {
        var fdate = new Date(d.entrydate).getTime();
        
        return (
            fdate >= new Date(startdateFilter).getTime() && 
            fdate < adjustedEndDate.getTime()  // Use the adjusted end date
        );
    }).sort(
        firstBy(function (a, b) {
            return new Date(a.entrydate).getTime() - new Date(b.entrydate).getTime();
        }).thenBy("entrytype", "desc")
    );

    SetcashLedger(data);

    getOpeningBalance();

    setShowMe('inline');
}

  function getReportDataOLD() {

      //this.setState( { bookings : this.state.bookings.filter( book => new Date(book.FromDate).getTime() >= this.state.startDate.getTime() && new Date(book.FromDate).getTime() <= this.state.endDate.getTime())});

    const data = branchdata.filter(d => {
       
      var fdate = new Date(d.entrydate).getTime()
 
      return (fdate >= new Date(startdateFilter).getTime() && fdate <= new Date(enddateFilter).getTime());
     }).sort(firstBy(function (a, b) {
      return new Date(a.entrydate).getTime() - new Date(b.entrydate).getTime()
    }).thenBy("entrytype", "desc"));

    // const data = branchdata.filter(row => {
    //   let filterPass = true
    //   const date = formatDate(new Date(row.entrydate))

 
    //   if (startdateFilter) {
    //     filterPass = filterPass && (date >= formatDate(new Date(startdateFilter)))
    //   }
    //   if (enddateFilter) {
    //     filterPass = filterPass && (date <= formatDate(new Date(enddateFilter)))
    //   }
    //   //if filterPass comes back `false` the row is filtered out
    //   return filterPass
    // }).sort(firstBy(function (a, b) {
    //   return new Date(a.entrydate) - new Date(b.entrydate)
    // }).thenBy("entrytype", "desc"));


    SetcashLedger(data);

    setShowMe('inline');

  }

  useEffect(() => {

    branchid == 19 && callBranchList();
    CallHeadList();
    CallBranchData();

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

              <div className="flex mb-4">
                {parseInt(reportbranchid) === 19 &&
                  <div className="flex items-center me-4">
                    <input id="showbranch-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => { e.target.checked ? Setshowbranchlist('inline') : Setshowbranchlist('none') }} />
                    <label for="showbranch-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Branch List</label>
                  </div>
                }
                <div className="flex items-center me-4">
                  <input id="showhead-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => { e.target.checked ? Setshowheadlist('inline') : Setshowheadlist('none') }} />
                  <label for="showhead-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Fee Head</label>
                </div>

              </div>

              <div style={{ display: showbranchlist }}>

                {parseInt(reportbranchid) === 19 &&
                  <div>
                    <select className="w-full max-w-xs text-black" name="ubranchid" required onChange={handleBranch}>
                      {
                        branchlist.map((opts, id) => <option key={id} value={opts.id} >{opts.branchname}</option>)
                      }
                    </select>
                  </div>
                }
              </div>

              <div style={{ display: showheadlist }}>
                {
                  <select data-te-select-init data-te-select-clear-button="true" className="w-full max-w-xs mt-3" id="category" name="category" required onChange={handleCashHead}>
                    <option value="Select Cash Head">Select Cash Head</option>
                    {
                      headlist.map((opts, _id) => <option key={_id} value={opts.cashexphead}>{opts.cashexphead}</option>)
                    }
                  </select>
                }

              </div>

              <br />
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

            <div style={{ display: showMe }}>
              <div className="report-logo">
                {/* <img alt="logo" src={logo} /> */}
              </div>

              <iframe id="txtArea1" style={{ display: "none" }}></iframe>

              <div className="border-solid border-yellow-500 px-5 ml-20">

              <div className="flex flex-col w-full justify-between items-center min-h-screen px-5 ml-20">

                <div className="flex flex-col w-full bg-slate-200 rounded-md shadow-2xl">

                  <div className="flex flex-row justify-end">

                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" id="btnExport" onClick={fnExcelReport}><RiFileExcel2Line /> EXCEL </button>
                    <span className="px-4 py-4"></span>
                    <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => {
                      handlePrint(null, () => contentToPrint.current);
                    }}>
                      <GrPrint />
                      PRINT
                    </button>
                  </div>

                  {/* {branchname}
                  {branchid}
                  {selectbranch} */}

                  <div ref={contentToPrint}>
                    <div className="mt-1 flex flex-col text-left px-8">

                      <h1 className="font-bold text-2xl">Cash Ledger Report</h1>
                      <h1 className="font-bold text-1xl text-blue-800">{branchname}</h1>
                      <h3 className="mt-5">From:{startdateFilter}</h3>
                      <h3>To: {enddateFilter}</h3>
                      <div className="flex flex-row">
                        <h3>Opening Balance: {formatNumber(opbalance)}</h3>
                      </div>
                    </div>
                    <div className="mr-5 px-8">
                      <table id="headerTable" className="table-fixed min-w-fit text-left text-sm font-light">
                        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                          <tr className="border-b dark:border-neutral-500">
                            <th className="px-4 py-2">Transaction Date</th>
                            <th className="px-4 py-2">Transaction Details</th>
                            <th className="px-4 py-2">Received</th>
                            <th className="px-4 py-2">Issued</th>
                            <th className="px-4 py-2">Balance</th>
                          </tr>
                        </thead>
                        {/* <APIData /> */}
                        {/* + '-' + data.entrytype */}
                        <tbody className="border-b dark:border-neutral-500">

                          {
                           
                            cashledger.map((data) => {
                              
                              { data.entrytype === "R" ? balance += Number(data.totalamount) : balance -= Number(data.totalamount) }

                              return <tr className="border-b dark:border-neutral-500" key={data._id}>
                                <td className="whitespace-nowrap  px-3 py-2">{formatDate(data.entrydate)}</td>
                                <td className="text-wrap px-3 py-2">{data.category + '\n' + data.description }</td>
                                <td className="whitespace-nowrap  ">{data.entrytype === "R" ? formatNumber(data.totalamount) : "0"}</td>
                                <td className="whitespace-nowrap  ">{data.entrytype === "I" ? formatNumber(data.totalamount) : "0"}</td>
                                <td className="whitespace-nowrap  font-bold text-blue-800">{formatNumber(balance+opbalance)}</td>

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

            </div>
          </div>
        </div>
      </div>

    </div>

  );
}


//For Date Formatting in Next JS
// https://date-fns.org/docs/Getting-Started

//npm install date-fns --save