"use client"
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
 


import { deleteCookie, setCookie, getCookies, hasCookie } from 'cookies-next';
import Link from "next/link";

const getLoginUser = async ({ email, password }) => {

    try {

        const res = await fetch('/api/checklogin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            throw new Error("User Not Found / Invalid Credentials!!");
        }

        return res.json();

    } catch (error) {

        throw new Error(error);
    }

}

export default function LoginForm() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { data: session, status } = useSession();
 
    const clearForm = (e) => {
        setEmail("");
        setPassword("");
    }

    const removeCookie = () => {
        //deleteCookies('userdata', { path: '/', });
        {
            hasCookie('username') &&
                deleteCookie('comid', { path: '/', });
            deleteCookie('username', { path: '/', });
            deleteCookie('email', { path: '/', });
            deleteCookie('branchid', { path: '/', });
            deleteCookie('usertype', { path: '/', });
            deleteCookie('userrole', { path: '/', });
            deleteCookie('firstlogin', { path: '/', });

            console.log('Cookies Removed....');
        }
       // signOut();

        router.replace('/');
    };


    useEffect(() => {
        removeCookie();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        signIn("credentials", { email, password, redirect: false }).then(async (e) => {
            if (e.error) {
                setError("Invalid email/password")
                router.replace('/');
            } else {

                try {

                    const userdata = await getLoginUser({ email, password });

                    let checkuser = userdata?.user?.name;
                  

                    if (typeof checkuser == "undefined") {

                        setError("Invalid Credentials.....")
                        toast("Invalid User ID / Password..")

                        router.replace('/');
                    }
                    else {

                        setCookie('comid', userdata?.user?.comid, { path: '/', });
                        setCookie('username', userdata?.user?.name, { path: '/', });
                        setCookie('email', userdata?.user?.email, { path: '/', });
                        setCookie('branchid', userdata?.user?.branchid, { path: '/', });
                        setCookie('usertype', userdata?.user?.usertype, { path: '/', });
                        setCookie('userrole', userdata?.user?.userrole, { path: '/', });
                        setCookie('firstlogin', userdata?.user?.firstlogin, { path: '/', });

                        const userinfo = getCookies();


                        const checkusertype = decodeURIComponent(userinfo?.usertype);

                        router.push('dashboard');

                        toast("User Sucessfully Login...")
                    }

                } catch (error) {

                    console.log("At Try Cash Error : " + error)
                }


                //router.push('/');
            }
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
                                <h1 className="text-lg font-bold ">User Login</h1>
                            </div>

                            <div className="shadow-lg p-5 rounded-lg mx-10 my-10">

                                <form name="loginform" autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-3">
                                    {/* <!-- Email input --> */}
                                    <input
                                        name="useremail"
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Enter Email"
                                        required
                                    />

                                    <input
                                        name="userpassword"
                                        type="password"
                                        className="input input-bordered w-full max-w-xs"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                        required
                                    />
                                    <div>
                                        <p className="mb-0 mt-1 text-sm font-semibold float-right">

                                            <Link className="text-sm mt-3 text-right" href={'/updatepassword'}>
                                                Forgot Password?
                                            </Link>

                                        </p>
                                    </div>


                                    {/* <!-- Login button --> */}
                                    <div className="text-center lg:text-left">
                                        <button className="bg-slate-500 text-white font-bold cursor-pointer px-6 py-2">
                                            Login
                                        </button>

                                        {error && (
                                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                                {error}
                                            </div>
                                        )}

                                        <Toaster />


                                        {/* <!-- Register link --> */}
                                        <p className="mb-0 mt-2 pt-1 text-sm font-semibold pl-20">

                                            <Link className="text-sm mt-3 text-right" href={'/register'}>
                                                New User?
                                                <span className="underline">SignUp</span>

                                            </Link>

                                        </p>
                                    </div>
                                </form>

                                <div className="hidden">
                        
                                <div className="mt-5 text-center">
                                    <hr />
                                    <span>or</span>
                                    <hr />
                                </div>

                                <button

                                    onClick={() => signIn("google")}
                                >
                                    <span>
                                        <svg viewBox="0 0 32 32" width="24" height="24">
                                            <defs>
                                                <path
                                                    id="A"
                                                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                                />
                                            </defs>
                                            <clipPath id="B">
                                                <use xlinkHref="#A" />
                                            </clipPath>
                                            <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                                                <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
                                                <path
                                                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                                                    clipPath="url(#B)"
                                                    fill="#ea4335"
                                                />
                                                <path
                                                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                                                    clipPath="url(#B)"
                                                    fill="#34a853"
                                                />
                                                <path
                                                    d="M48 48L17 24l-4-3 35-10z"
                                                    clipPath="url(#B)"
                                                    fill="#4285f4"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    <span>Sign in with Google</span>
                                </button>
                                <div className="px-2">
                                        <span></span>
                                </div>
                                <button

                                    onClick={() => signIn("github")}
                                >
                                    <span>
                                        <svg
                                            width="24"
                                            height="auto"
                                            viewBox="0 0 98 96"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                                fill="#24292f"
                                            />
                                        </svg>
                                    </span>
                                    <span>Sign in with Github</span>
                                </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}