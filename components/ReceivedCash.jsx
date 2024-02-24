"use client";

 
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"
import { useState, useEffect, useRef } from "react";
import { getCookie, getCookies } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast'; 
import { revalidatePath } from "next/cache"

import { usePathname } from "next/navigation";
 
export default function ReceivedCash({...props}) {

    // const [state, formAction] = useFormState(cashReceive, {
    //     message: '',

    // })

    const curpath = usePathname();

    const { pending } = useFormStatus()

    const ref = useRef()
    let inputRef = useRef(null)

 
    const router = useRouter();

    const [comid, SetComid] = useState(getCookie('usercomp'));
    const [branchid, SetBranchid] = useState(getCookie('branchid'));
    const [username, SetUsername] = useState(getCookie('username'));
    const [entrydate, SetEntrydate] = useState(Date.now());
    const [entrytype, SetEntrytype] = useState("R");
    const [category, SetCategory] = useState("");
    const [description, SetDescription] = useState("");
    const [totalamount, SetTotalamount] = useState("");
    const [remarks, SetRemarks] = useState("");
 
    //const headlist = Object.entries({...props});

    const headlist = [...Object.values(props)];

 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const loginuser = decodeURIComponent(getCookie('username'));
        // const loginbranch = decodeURIComponent(getCookie('userbranchid'));
        // const logincomp = decodeURIComponent( getCookie('usercomp'))
        const apiUrl = process.env.API_URL;

        const formvalues = { comid,branchid,username,entrydate,entrytype,category,description,totalamount,remarks };

        try {
 
            const res = await fetch('/api/cashreceive', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formvalues)
            });

            if (res.ok) {
                revalidatePath('/'+curpath)
                toast("Cash Sucessfully Received...")

                setTimeout(() => {
                    (handleRedirect());
                }, 1000);

               // {() => (document.getElementById('recv_modal')).close()}
            
                
            } else {
                const errorMesg = await res.json();
                setError(errorMesg.message);
                toast("Cash Receiving Failed...");
             
            }

        } catch (error) {
            toast(error);
 
        }

    }

    const showToastMessage = (msg, typ) => {
        typ = "error" ?
            toast.error({ msg }, {
                position: toast.POSITION.TOP_RIGHT,
            }) :
            toast.success({ msg }, {
                position: toast.POSITION.TOP_RIGHT,
            });
    }    

    const handleRedirect = () => {
        router.refresh();
        {
            branchid==19 ? router.push("/dashboard") : router.push("/branchdashboard");
        }
         
    }
 
 

    return (
     

        <div>
            <button className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700'
                onClick={() => (document.getElementById('recv_modal')).showModal()}
            >
                Cash Received
            </button>

            <dialog id="recv_modal" className="modal">
                <div className="modal-box">
                    <div className="bg-slate-500 px-5 text-white">
                        {username}
                        <button className="float-right" type="button" onClick={() => (document.getElementById('recv_modal')).close()}>                             
                            <h1>X</h1>
                        </button>
                    </div>
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Cash Collection Form</h2>
                                                                                
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-5">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Entry Title</label>
                                        <input type="text" 
                                               name="recvtitle" 
                                               id="recvtitle" 
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                               placeholder="Collection Title" 
                                               required
                                               value={remarks}
                                               onChange={(e) => SetRemarks(e.target.value)}
                                               />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="coldate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Date</label>
                                        <input type="date" 
                                               name="coldate" 
                                               id="coldate" 
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                               placeholder="Collection Date" 
                                               required
                                               onChange={(e) => SetEntrydate(e.target.value)}
                                               />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount Received</label>
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
                                        <label htmlFor="category" className="w-full max-w-xs">Collection Purpose</label>
                                    
                                        <select data-te-select-init data-te-select-clear-button="true" className="w-full max-w-xs" id="category" name="category" required onChange={(e) => SetCategory(e.target.value)}>
                                            {
                                                headlist.map((opts, _id) => <option key={_id} value={opts.cashexphead}>{opts.cashexphead}</option>)
                                            }
                                        </select>                                         
                                       
                                       
{/*                                        
                                        <select id="category" name="category"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                                required 
                                                onChange={(e) => SetCategory(e.target.value)}>
                                            <option value="0">Select purpose/event</option>
                                            <option value="Field Trip">Office Expenses</option>
                                            <option value="Field Trip">Field Trip</option>
                                            <option value="Book Sale">Book Sale</option>
                                            <option value="CAIE Fee">CAIE Fee</option>
                                            <option value="Donation">Donation</option>
                                        </select> */}
                                    </div>
                                    <div>
                                        <label htmlFor="receiveby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Received By</label>
                                        <input type="text" 
                                               name="receiveby" 
                                               id="receiveby" 
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                               placeholder="Receiver Name" 
                                               value={username}
                                               readOnly                                        
                                               />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
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
                                

                                <button
                                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                    type="button"
                                    onClick={() => (document.getElementById('recv_modal')).close()}
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



//https://www.linkedin.com/pulse/7-ways-convert-objects-array-javascript-awais-al-waisy/

//https://www.samanthaming.com/tidbits/76-converting-object-to-array/