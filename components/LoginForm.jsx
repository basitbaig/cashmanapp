"use client"
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import  { useRouter }  from "next/navigation";
// import { signIn, signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";
//import { getLoginUser } from "@/model/getdata";

import { deleteCookie, setCookie, getCookies, hasCookie } from 'cookies-next';
import Link from "next/link";

const getLoginUser = async ({email,password}) => {
  
    try {
      
        const res = await fetch('/api/checklogin', {
            method: "POST",
            headers: { "Content-Type": "application/json" },          
            body: JSON.stringify({ email, password })
          });
    
          if (!res.ok) {
            throw new Error("Balance List Not Found!!");
          }
      
          return res.json();
        
    } catch (error) {
      throw new Error(error);
    }
          
  }
 

export default function LoginForm() {
    //File system object
    // const { data: session } = useSession();
 
    const [pending, setPending]=useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
 
    const router = useRouter();
 
    const clearForm = (e) => {
        setEmail("");
        setPassword("");
    }    
    
 
    const removeCookie = () => {

        deleteCookie('userdata', { path: '/', });

        signOut();

        // deleteCookie('usercomp', { path: '/', });
        // deleteCookie('username', { path: '/', });
        // deleteCookie('useremail', { path: '/', });
        // deleteCookie('userbranchid', { path: '/', });
        // deleteCookie('usertype', { path: '/', });
        // deleteCookie('userlogin', { path: '/', });
    
        router.replace('/');
    };

     
    const handleSubmit = async (e) => {
        e.preventDefault();
        //setPending(true);
    

        // console.log('---Email and Password At Login Page-----');
        // console.log(email);
 
        const userdata =  await getLoginUser({email,password});

 
        try {

            // const res = await signIn("credentials", {
            //     email,
            //     password,
            //     redirect: false,
            // });
            // if (res.error) {
            //         setError("Invalid Credentials..")
            //     return;
            // }
            // console.log(session);
            // const userdata =session?.token?._doc;
            // console.log(session?.token?._doc);

            let checkuser = userdata?.user?.name;

//            console.log(typeof checkuser == "undefined");
 
            if (typeof checkuser == "undefined")
            {
    
                setError("Invalid Credentials.....")
                toast("Invalid User ID / Password..")

                router.replace('/');
            }
            else{

                setCookie('comid', userdata?.user?.comid, { path: '/', });
                setCookie('username', userdata?.user?.name, { path: '/', });
                setCookie('email',userdata?.user?.email, { path: '/', });
                setCookie('branchid', userdata?.user?.branchid, { path: '/', });
                setCookie('usertype', userdata?.user?.usertype, { path: '/', });
                setCookie('userrole', userdata?.user?.userrole, { path: '/', });
                setCookie('firstlogin', userdata?.user?.firstlogin, { path: '/', });          
    
                const userinfo = getCookies();
    
         
                const checkusertype = decodeURIComponent(userinfo?.usertype);
    
                router.replace('dashboard');
    
                //router.replace(checkusertype === "Branch" ? 'branchdashboard' : 'dashboard' );    
                toast("User Sucessfully Login...")
            }
     
 
            // setTimeout(() => {
            //     (handleRedirect());
            // }, 1000);

        } catch (error) {
            //toast(error);
            console.log("At Try Cash Error : " + error)
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

    // useEffect(() => {
        
    //    // removeCookie();

    // }, []);


    return (
        <div className="grid place-items-center h-screen">
            {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> */}
            <section className="h-screen">
                <div className="h-full">
                    {/* <!-- Left column container with background--> */}

                    <div  className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">

                        <div  className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
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

                                   {/* // disabled={pending?true:false}>
                                    //     {pending?"Logging In":"Login"} */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}