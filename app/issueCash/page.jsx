"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"
import IssueCash from  "@/components/IssueCash";
import { getCashTypes } from '@/model/getdata'
import { getCookie, getCookies } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast';

export default function CashIssue() {

 
  const [Issuheadlist, SetIssuheadlist]=useState([]);

  const [comid, SetComid] = useState(getCookie('comid'));
  const [branchid, SetBranchid] = useState(getCookie('branchid'));
  const [username, SetUsername] = useState(getCookie('username'));
  const [entrydate, SetEntrydate] = useState(Date.now());
  const [entrytype, SetEntrytype] = useState("I");
  const [category, SetCategory] = useState("");
  const [description, SetDescription] = useState("");
  const [totalamount, SetTotalamount] = useState("");
  const [remarks, SetRemarks] = useState("");

  const { pending } = useFormStatus()

  const CallDataTypes = async () => {
    SetIssuheadlist(await getCashTypes("I"));
  }
 
  useEffect(() => {
    
    CallDataTypes();
  
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.API_URL;
 
    const formvalues = { comid, branchid, username, entrydate, entrytype, category, description, totalamount, remarks };

    try {

      console.log(formvalues);

      const res = await fetch('/api/cashissue', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formvalues)
      });


      if (res.ok) {
        toast("Cash Sucessfully Issued...")

        document.getElementById('issue_modal').close();

        router.refresh();
        {
          branchid==19 ? router.replace("/dashboard") : router.push("/branchdashboard");    
        }
        
        setTimeout(() => {
          (handleRedirect());
        }, 1000);

      } else {
        const errorMesg = await res.json();
        setError(errorMesg.message);
        toast("Cash Issuance Failed...");

      }

    } catch (error) {
      toast(error);

    }

  }



  return (

    <div>
      <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
        onClick={() => (document.getElementById('issue_modal')).showModal()}
      >
        Cash Issue
      </button>

      <dialog id="issue_modal" className="modal">
        <div className="modal-box">
          <div className="bg-slate-500 px-5 text-white">
            {username}
            <button className="float-right" type="button" onClick={() => (document.getElementById('issue_modal')).close()}>
              &times;
            </button>
          </div>
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
              <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Cash Disbursement Form</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
                  <div className="sm:col-span-2">
                    <label htmlfor="issutitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entry Title</label>
                    <input type="text"
                      name="issutitle"
                      id="issutitle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Disbursement Title"
                      required
                      value={remarks}
                      onChange={(e) => SetRemarks(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlfor="isudate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disbursement Date</label>
                    <input type="date"
                      name="isudate"
                      id="isudate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Issue Date"
                      required
                      onChange={(e) => SetEntrydate(e.target.value)}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlfor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Issued</label>
                    <input type="number"
                      name="amount"
                      id="amount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="1000"
                      required
                      onChange={(e) => SetTotalamount(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlfor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Disbursement Purpose</label>
                 
                    <select data-te-select-init data-te-select-clear-button="true" className="w-full max-w-xs" id="category" name="category" required onChange={(e) => SetCategory(e.target.value)}>
                      {
                        Issuheadlist.map((opts, _id) => <option key={_id} value={opts.cashexphead}>{opts.cashexphead}</option>)
                      }
                    </select>                 
                 
                                                  
                    {/* <select id="category" name="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      onChange={(e) => SetCategory(e.target.value)}>
                      <option value="0">Select purpose/event</option>
                      <option value="Field Trip">
                      {branchid==19 ? `Cash to Branch` : `Cash to Head Office`}                                              
                      </option>
                      <option value="Book Sale">Repair & Maintenance</option>
                      <option value="CAIE Fee">Office Expenses</option>
                      <option value="Donation">Donation</option>
                      <option value="Donation">Staff Salary</option>
                    </select> */}


                  </div>
                  <div>
                    <label htmlfor="issueby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Received By</label>
                    <input type="text"
                      name="issueby"
                      id="issueby"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Issuer Name"
                      value={username}
                      readOnly
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlfor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" name="description"
                      rows="5"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your description here"
                      value={description}
                      onChange={(e) => SetDescription(e.target.value)}
                    >
                    </textarea>
                  </div>
                </div>
                {/* className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" */}

                {/* className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"> */}

                <Toaster />

                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                  type="button"
                  onClick={() => (document.getElementById('issue_modal')).close()}
                >
                  Back
                </button>

                <button type="submit" className="ml-60 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                  Submit
                </button>
                                
              </form>



            </div>
          </section>


        </div>
      </dialog>
    </div>

  )
}