"use client";

import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom"
import { useState, useEffect, useRef } from "react";
import { getCookie, getCookies } from 'cookies-next';
import toast, { Toaster } from 'react-hot-toast';

export default function BranchList() {

    const { pending } = useFormStatus()

    const ref = useRef()
    let inputRef = useRef(null)

    const router = useRouter();

    const [username, SetUsername] = useState(getCookie('username'));
    const [branchid, SetBranchid] = useState("");
    const [branchname, SetBranchname] = useState("");
    const [company, SetCompany] = useState("");
    const [branchemail, SetBranchemail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

        const formvalues = { branchid, branchname, company, branchemail };

        try {

            const res = await fetch('/api/addupdatebranchlist', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formvalues)
            });

            if (res.ok) {

 
                { () => (document.getElementById('branch_modal')).close() }

                router.push("/dashboard");

            } else {
                const errorMesg = await res.json();
                setError(errorMesg.message);
                toast("Branch Update Failed...");
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


    return (
        <div
            onKeyDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onFocus={e => e.stopPropagation()}
            onMouseOver={e => e.stopPropagation()}                
        >
            <button className="text-gray-900 bg-white border-none focus:outline-none hover:bg-gray-100  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => (document.getElementById('branch_modal')).showModal()}
            >
                New Branch Update
            </button>



            <dialog id="branch_modal" className="modal">
                <div className="modal-box">
                    <h1>{username}</h1>
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-5 px-2 mx-auto max-w-2xl lg:py-5">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">New Branch Update</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 sm:grid-cols-1 sm:gap-6 mb-3">

                                    <div className="sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch ID</label>
                                        <input type="number"
                                            name="branchid"
                                            id="branchid"
                                            width="5px"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="BranchID"
                                            required
                                            value={branchid}
                                            onChange={(e) => SetBranchid(e.target.value)}
                                        />
                                    </div>



                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch Name</label>
                                        <input type="text"
                                            name="branchname"
                                            id="branchname"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Correct Branch Name as Per SimpliED Database"
                                            required
                                            value={branchname}
                                            onChange={(e) => SetBranchname(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                                        <select data-te-select-init data-te-select-clear-button="true" name="company" required onChange={(e) => SetCompany(e.target.value)}>
                                            <option value="">Select Company</option>
                                            <option value="1">FPS</option>
                                            <option value="2">HSS</option>   
                                            <option value="3">VIDA</option>
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="branchemail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Branch Email</label>
                                        <input type="text"
                                            name="branchemail"
                                            id="branchemail"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Correct Branch Email as Per SimpliED Database"
                                            required
                                            value={branchemail}
                                            onChange={(e) => SetBranchemail(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <input type="hidden"
                                            name="createby"
                                            id="createby"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Creator Name"
                                            defaultValue={username}
                                            readOnly
                                        />
                                    </div>

                                </div>
 
                                <button
                                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                                    type="button"
                                    onClick={() => (document.getElementById('branch_modal')).close()}
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

