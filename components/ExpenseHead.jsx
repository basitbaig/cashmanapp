"use client";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"
import { useState, useEffect, useRef } from "react";
import { getCookie, getCookies } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast'; 
import { usePathname } from "next/navigation";
 

export default function ExpenseHead() {

    const [username, SetUsername] = useState(getCookie('username'));
    const [exphead, SetExpHead] = useState("");
    const [headtype, SetHeadType] = useState("");
    const [isLoading, setLoading] = useState(true)
    
    const curpath = usePathname();

    const { pending } = useFormStatus()

    const ref = useRef()
    let inputRef = useRef(null)

   
    const router = useRouter();


    //const branchid = getCookie('userbranchid')
   
    

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const formvalues = { username,exphead, headtype };
        const apiUrl = process.env.API_URL;
        try {
 
            const res = await fetch(process.env.API_URL +'/api/cashexphead', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formvalues)
            });

            if (res.ok) {
                revalidatePath('/'+curpath)
                toast("Cash/Expense Head Created...");

                //document.getElementById('exphead_modal').close();

                router.refresh();
               
                router.push("/dashboard");   
                 

                // setTimeout(() => {
                //     (handleRedirect());
                // }, 1000);
            
               //{() => (document.getElementById('exphead_modal')).close()}

             

            } else {
                const errorMesg = await res.json();
                setError(errorMesg.message);
                toast("Cash/Expense Head Failed...");             
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
          router.push("/dashboard");
        }
         
    }

  return (

    <div>
        <button className="text-gray-900 bg-white border-none focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-700"
        onClick={() => (document.getElementById('exphead_modal')).showModal()}
         >
        New Cash/Expense Head
      </button>



          <dialog id="exphead_modal" className="modal">
                <div className="modal-box">
                      <h1>{username}</h1>
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-2 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Expenses / Cash Head</h2>
                                                                            
                            <form name="cashheadform" onSubmit={handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-1 sm:gap-6 mb-3">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="exphead" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cash/Expense Head Title</label>
                                        <input type="text" 
                                               name="exphead" 
                                               id="exphead" 
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                               placeholder="Expense/Cash Head Title" 
                                               required
                                               value={exphead}
                                               onChange={(e) => SetExpHead(e.target.value)}
                                               />
                                    </div>
                                    <div>
                                    <label htmlFor="headtype" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cash/Expense Head Type</label>
                                        <select data-te-select-init data-te-select-clear-button="true" name="headtype" required onChange={(e) => SetHeadType(e.target.value)}>
                                            <option value="">Select Head Type</option>
                                            <option value="R">Receiving Head</option>
                                            <option value="I">Issuance Head</option>
                                        </select>


                                    </div>
 
 
                                    <div>
                                           <input type="hidden" 
                                               name="createby" 
                                               id="createby" 
                                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                               placeholder="Creator Name" 
                                               value={username}                                              
                                               readOnly                                        
                                               />
                                    </div>
 
                                </div>
                                {/* className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800" */}
                                
                                {/* className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"> */}
                                

                                <button
                                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                    type="button"
                                    onClick={() => (document.getElementById('exphead_modal')).close()}
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

 