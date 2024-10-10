'use client'
import { cache } from 'react';
import { useFormStatus } from "react-dom";
import { useTransition } from "react";
import { useState, useId } from "react";
//import { findTransaction } from "@/model/getdata";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';
import { getCookie, getCookies } from 'cookies-next';
import { useTransaction } from '@/context/TransactionContext';

async function findTransaction({ transactionid }) {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {
    const res = await fetch('/api/getpendingentry', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionid })
    });


    if (!res.ok) {
      throw new Error("No Pending Entries Found!!");
    }

    const data = await res.json();

    return data;

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }
}


export default function RejectPending({ transid }) {

  //https://react-icons.github.io/react-icons/search/#q=close

  const [transactionid, SettransactionId] = useState(transid);
  const [rejectreason, SetrejectReason] = useState("");
  const { setTransactionTrigger } = useTransaction();

  const id = useId();

  const [isPending, startTransition] = useTransition();

  const { pending } = useFormStatus()

  //const ref = useRef<HTMLFormElement>(null)

  const initialValues = {                   // type all the fields you need
    branchname: '',
    description: '',
    totalamount: '',
    rejectreason: ''
  };

  const [values, setValues] = useState(initialValues);       // set initial state

  const handleConfirm = async () => {

    // const { pendingEntry } = await findTransaction({ transactionid });

    // setValues(values => {
    //   return { ...values, ...pendingEntry }
    // })

    const result = await findTransaction({ transactionid });

    // Assuming pendingEntry is an array and you want the first object or need to map it
    const pendingEntry = result.pendingEntry[0]; // Use the first entry (or map as needed)
  
    setValues(prevValues => ({
      ...prevValues,
      ...pendingEntry // Merge pendingEntry fields into the existing state
    }));

  }

  function refreshMyPage()
  {
    window.location.reload();
  }  

  const handleSubmit = async (e) => {

    e.preventDefault();

    const apiUrl = process.env.API_URL;

    try {

      const res = await fetch('/api/rejectpending', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transid, rejectreason })
      });

      if (res.ok) {

        toast("Transaction Successfully Rejected.");

        setTransactionTrigger(true);

        // { (document.getElementById(id)).close() }

        //refreshMyPage();

      } else {
        toast("Transaction Failed, Please try again...");
      }
    } catch (error) {
      toast(error);
    }


  }



  return (
    <>
      <div>
        <Toaster />

        <form action={handleConfirm}>


          <button type="submit" disabled={pending} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => startTransition(() => (document.getElementById(id)).showModal())}
          >
            {isPending ? "Call Reject..." : "Reject"}

          </button>

        </form>

        <div>

          <dialog id={id} className="modal max-w-screen-2xl">

            <div className="modal-box">

              <div className="text-center">
                <h2 className="font-bold pm-4 w-full bg-gray-900 text-white">Confirm Rejection</h2>
                <div className="bg-slate-500 text-white">
                  <button className="flex float-right" type="button" onClick={() => (document.getElementById(id)).close()}>
                    <IoClose />
                  </button>
                </div>
              </div>


              <div className="px-4 py-4 ml-10">
                <form onSubmit={handleSubmit}>

                  <input type="text" name="trid" defaultValue={transid} className="font-bold text-green-500" />
                  <div className="form-control w-full max-w-xs py-4">
                    <label className="inline-block">Branch Name:<h1 className="font-bold text-blue-800 underline">{values.branchname}</h1></label>
                  </div>
                  <div className="form-control w-full max-w-xs py-4">
                    <label htmlFor="image">Description</label>
                    <h5 className="font-bold text-blue-800 underline">{values.description}</h5>
 
                  </div>
                  <div className="form-control w-full max-w-xs py-4">
                    <label htmlFor="price">Amount</label>
                    <h3 className="font-bold text-blue-800 underline">{values.totalamount}</h3>
 
                  </div>
                  <div className="form-control w-full max-w-xs py-4">
                    <label htmlFor="image">Reason</label>
                    <input
                      type="text"
                      id="rejectreason"
                      name="rejectreason"
                      placeholder="Mention Rejection Reason"
                      value={rejectreason}
                      onChange={(e) => SetrejectReason(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    type="button"
                    onClick={() => (document.getElementById(id)).close()}
                  >
                    Back
                  </button>

                  <button
                    className="float-right rounded ml-8 bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                    type="submit"
                    disabled={pending}
                  >
                    Reject Confirm
                  </button>
                </form>
              </div>

            </div>
          </dialog>
        </div>


      </div>
    </>
  )
}

