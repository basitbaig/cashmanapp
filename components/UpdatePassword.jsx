"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { deleteCookie, setCookie } from 'cookies-next';
import { getCookie, getCookies } from 'cookies-next';

export default function UpdatePassword() {

    const userinfo = getCookies();

    const [uemail, setUserEmail] = useState(userinfo?.email);
    const [changeemail, setChangeEmail] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
 
    
    const router = useRouter();

    // useEffect(()=>{
		 
    //     setUserEmail(session?.user?.email);

	// }, [])


    const handleRedirect = () => {
        router.refresh();
        router.replace("dashboard");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(uemail);
        // console.log(newpassword);
        // console.log(confirmpassword);

        const apiUrl = process.env.API_URL;

        try {

            if (newpassword != confirmpassword) {
                toast("Password & Confirm Password Not Matched!");
                return;
            }
           const newpassemail = changeemail!=''?changeemail:userinfo?.email;

            const res = await fetch(process.env.API_URL + '/api/updatepassword', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email:newpassemail, password: newpassword})
            });

            if (res.ok) {
                // const form = e.target;
                toast("Password Updated Sucessfully...");

                setCookie('userlogin', 'false', { path: '/', });
                
                setTimeout(() => {
                    (handleRedirect());
                }, 2000);
            } else {
                toast("Password Updation Failed, Please try again...");
            }
        } catch (error) {
            toast(error);
        }

    }

    // const showToastMessage = (msg, typ) => {
    //     typ = "error" ?
    //         toast.error({ msg }, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         }) :
    //         toast.success({ msg }, {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    // }

    return (

        <div className="grid place-items-center h-screen">
            {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
            <section className="h-screen">
                <div className="h-full">
                    {/* <!-- Left column container with background--> */}

                    <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <div className="p-5 rounded-lg mx-2 my-2 text-center">
                                <h1 className="font-bold text-purple-800 text-3xl">Cash Management System</h1>
                            </div>
                            <Image src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                width="400"
                                height="400"
                                alt="Sample image" />
                        </div>


                        {/* <!-- Right column container --> */}

                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">

                            <div className="shadow-lg p-5 rounded-lg mx-10 my-10 bg-slate-500 text-center text-white border-x-20 border-y-20 border-green-400">
                               <span>Change Password for Email: {uemail} </span>
                            </div>

                            <div className="shadow-lg p-5 rounded-lg mx-10 my-10 bg-slate-500 text-center text-white border-x-20 border-y-20 border-green-400">
                                <h1 className="text-lg font-bold ">Change Password</h1>
                            </div>

                            <div className="shadow-lg p-5 rounded-lg mx-10 my-10">

                                <form name="updateform" onSubmit={handleSubmit} className="flex flex-col gap-3">

                                    {uemail ? (
                                        <p>{uemail}</p>
                                       
                                    ) : (
                                        <input
                                        type="text"
                                        id="txtemail"
                                        name="txtemail"
                                        className="input input-bordered w-full max-w-xs"
                                        value={changeemail}
                                        onChange={e => setChangeEmail(e.target.value)}
                                        placeholder="Email ID"
                                        required
                                    />
                                    )}
 
                                    {/* <!-- Email input --> */}
                                    <input
                                        type="password"
                                        id="upassword"
                                        name="upassword"
                                        className="input input-bordered w-full max-w-xs"
                                        value={newpassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        required
                                    />

                                    <input
                                        type="password"
                                        id="cpassword"
                                        name="cpassword"
                                        className="input input-bordered w-full max-w-xs"
                                        value={confirmpassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        required
                                    />

                                    {/* <!-- Login button --> */}
                                    <div className="text-center lg:text-left">

                                        <Link className="bg-slate-500 text-white font-bold cursor-pointer my-5 px-6 py-2 mr-10" href={'/'}>
                                        <span>Back</span>
                                        </Link>


                                        <button className="bg-slate-500 text-white font-bold cursor-pointer my-5 px-6 py-2">
                                            Submit
                                        </button>
                                        {/* <Toaster /> */}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}