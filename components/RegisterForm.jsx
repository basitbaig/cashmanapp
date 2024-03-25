"use client"

import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { getBranchList } from '@/model/getdata'

export default function RegisterForm() {

    const initialValues = {                   // type all the fields you need
        name: '',
        email: '',
        password: ''
    };

    const [values, setValues] = useState(initialValues);
    const [ucomid, setComID] = useState("");
    const [ubranchid, setBranchID] = useState("");
    const [urole, setUserRole] = useState("");
    const [utype, setUserType] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");    
 
    const [branchlist, SetBranchlist] = useState([]);
    
    //[...Object.values(props)];

    const router = useRouter()

    const CallBranchList = async () => {
        SetBranchlist(await getBranchList("all"));
    }

    useEffect(() => {    
        CallBranchList();      
      }, []);    

    const saveuserData = (e) => {
        e.preventDefault();

        setValues(values => {
            return { ...values, [e.target.name]: e.target.value }
        })
    }

    const handleBranch = (e) => {
        e.preventDefault();

        setBranchID(e.target.value);

        let utyp = e.target.value == 19 ? "Finance" : "Branch";

        setUserType(utyp);

        const brhcomp = branchlist.find((bl) => bl.id == e.target.value);

        setComID(brhcomp.comid);

        //showToastMessage(e.target.value, "branch");

        // setValues(values => {
        //     return { ...values, [e.target.name]: e.target.value }
        // })
    }

    const handleRole = (e) => {
        e.preventDefault();
        showToastMessage(e.target.value, "user");
        // setValues(values => {
        //     return { ...values, [e.target.name]: e.target.value }
        // })
    }


    const handleRedirect = () => {
        router.refresh();
        router.push("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const {name, email, password, branchid, userrole} = [...formvalues];
        const apiUrl = process.env.API_URL;

        const formvalues = { ...values, ucomid, ubranchid, urole, utype };

        try {

            setPending(true);
            let email = formvalues.email;

            const rescheckemail = await fetch('/api/checkuser', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const userfound = await rescheckemail.json();

            //console.log(userfound);

            if (!userfound === null) {
                toast("User Already exist With This Email ID.");
                return;
            }

            const res = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formvalues)
            });

            if (res.ok) {
                setPending(false);
                toast("User Successfully Registered...")
                setTimeout(() => {
                    (handleRedirect());
                }, 2000);
            } else {
                const errorMesg = await res.json();
                setError(errorMesg.message);
                toast("User Registration Failed...");
                setPending(false);
            }

        } catch (error) {
            toast(error);
            setPending(false);
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
                                <h1 className="text-lg font-bold ">New User SignUp</h1>
                            </div>

                            <div className="shadow-lg p-5 rounded-lg mx-10 my-10">

                                <form name="registerform" onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    {/* <!-- Email input --> */}
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="input input-bordered w-full max-w-xs"
                                        value={values.name}
                                        onChange={saveuserData}
                                        placeholder="Enter Full Name"
                                        required
                                    />

                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="input input-bordered w-full max-w-xs"
                                        value={values.email}
                                        onChange={saveuserData}
                                        placeholder="Enter User Email"
                                        required
                                    />

                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="input input-bordered w-full max-w-xs"
                                        value={values.password}
                                        onChange={saveuserData}
                                        placeholder="Enter User Password"
                                        required
                                    />



                                    <select data-te-select-init data-te-select-clear-button="true" className="w-full max-w-xs" name="ubranchid" required onChange={handleBranch}>
                                        {
                                            branchlist.map((opts, id) => <option key={id} value={opts.id}>{opts.branchname}</option>)
                                        }
                                    </select>


                                    {/* <select data-te-select-init data-te-select-clear-button="true" name="ubranchid" required onChange={(e) => setBranchID(e.target.value)}>
                                        <option value="0">Select User Branch</option>
                                        <option value="21">Elementary Shahrah-e-Faisal</option>
                                        <option value="6">North Campus Junior</option>
                                        <option value="2">Junior Campus Defence</option>
                                        <option value="27">Junior Campus North Nazimabad</option>
                                    </select> */}
                                    {ubranchid == 19 ?
                                        <select className="w-full max-w-xs" name="urole" required onChange={(e) => setUserRole(e.target.value)}>
                                            <option value="0">Select User Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </select>
                                        :
                                        <select className="w-full max-w-xs" name="urole" required onChange={(e) => setUserRole(e.target.value)}>
                                            <option value="0">Select User Role</option>
                                            <option value="User">User</option>
                                        </select>
                                    }


                                    {/* <!-- Login button --> */}
                                    <div className="text-center lg:text-left">

                                    {/* <Link className="bg-slate-500 text-white font-bold cursor-pointer my-5 px-6 py-2 " href={'/'}>
                                       <span>Back</span>
                                    </Link> */}

                                     <div className="float-right">   
                                          <button className="bg-slate-500 text-white font-bold cursor-pointer my-5 px-6 py-2">
                                            Submit
                                        </button>
                                     </div>

                                        <Toaster />
                                        {/* <!-- Register link --> */}
                                        <p className="mb-0 mt-7 pt-1 text-sm font-semibold">

                                            <Link className="text-sm mt-3 text-right" href={'/'}>
                                                Already have an account?
                                                <span className="underline">Login</span>

                                            </Link>

                                        </p>
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