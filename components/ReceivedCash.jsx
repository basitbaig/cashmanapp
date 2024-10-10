"use client";


import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"
import { useState, useEffect, useRef } from "react";
import { setCookie, getCookie, getCookies } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast';
import { revalidatePath } from "next/cache"
import { usePathname } from "next/navigation";
import { useTransaction } from '@/context/TransactionContext';

export default function ReceivedCash({ ...props }) {
 
    const curpath = usePathname();

    const { setTransactionTrigger } = useTransaction();

    const { pending } = useFormStatus()

    const ref = useRef()
    let inputRef = useRef(null)


    const router = useRouter();

    const [comid, SetComid] = useState(getCookie('comid'));
    const [branchid, SetBranchid] = useState(getCookie('branchid'));
    const [username, SetUsername] = useState(getCookie('username'));
    const [entrydate, SetEntrydate] = useState(Date.now());
    const [entrytype, SetEntrytype] = useState("R");
    const [category, SetCategory] = useState("");
    const [description, SetDescription] = useState("");
    const [totalamount, SetTotalamount] = useState("");
    const [remarks, SetRemarks] = useState("");

 
    const headlist = [...Object.values(props)];

    function refreshMyPage()
    {
      window.location.reload();
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

        const formvalues = { comid, branchid, username, entrydate, entrytype, category, description, totalamount, remarks };

        try {

            const res = await fetch('/api/cashreceive', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formvalues)
            });

            if (res.ok) {

                toast("Cash successfully Received...");

                setTransactionTrigger(true);
                //setCookie('recordupdate','true')
                // revalidatePath('/' + curpath)


                // Dispatch a custom event
                // const event = new Event('transactionCompleted');
                // window.dispatchEvent(event);


                SetCategory("Select Cash Head");
                SetDescription("");
                SetTotalamount("");
                SetRemarks("");
         

                document.getElementById('recv_modal').close();

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
            branchid == 19 ? router.push("/dashboard") : router.push("/branchdashboard");
        }

    }



    return (


        <div>
            <button className='rounded bg-blue-500 px-4 py-4 w-40 text-white hover:bg-blue-700'
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
                        <div className="py-4 px-4 mx-auto max-w-2xl lg:py-10">
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
                                            defaultValue={new Date().toISOString().split('T')[0]} // Set default value as current date
                                            //onChange={(e) => SetEntrydate(e.target.value)}
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
                                        <option value="">Select Cash Head</option>
                                            {
                                                headlist.map((opts, _id) => <option key={_id} value={opts.cashexphead}>{opts.cashexphead}</option>)
                                            }
                                        </select>

                                    </div>
                                    <div>
                                        <label htmlFor="receiveby" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Received By</label>
                                        <input type="text"
                                            name="receiveby"
                                            id="receiveby"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Receiver Name"
                                            defaultValue={username}
                                            readOnly
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea id="description" name="description"
                                            rows="3"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Your description here"
                                            value={description}
                                            onChange={(e) => SetDescription(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                </div>
         
                                <button
                                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                    type="button"
                                    onClick={() => (document.getElementById('recv_modal')).close()}
                                >
                                    Back
                                </button>

                                <button type="submit" className="ml-60 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" aria-disabled={pending}>
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


 