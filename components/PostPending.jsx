'use client'
import { cache } from 'react';
import { useFormStatus } from "react-dom";
import { useTransition } from "react";
import { useState, useId } from "react";
import { findTransaction } from "@/model/getdata";
import { IoClose } from "react-icons/io5";
import toast, { Toaster } from 'react-hot-toast';

export default function PostPending({ transid }) {

 //https://react-icons.github.io/react-icons/search/#q=close

  const [transactionid, SettransactionId]=useState(transid);
  
  const id = useId();

  const [isPending, startTransition] = useTransition();

  const { pending } = useFormStatus()

  //const ref = useRef<HTMLFormElement>(null)

  const initialValues = {                   // type all the fields you need
    branchname: '',
    description: '',
    totalamount: ''
};

const [values, setValues] = useState(initialValues);       // set initial state
 
const handleConfirm = async () => {

  const res = await findTransaction({transactionid});

  setValues(values => {
    return { ...values, ...res }
  })

}

  const handleSubmit = async (e) => {
    e.preventDefault();

    alert(transid);

    try {
 
      const res = await fetch(process.env.URL + '/api/confirmpending', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transid })
      });

      if (res.ok) {
        // const form = e.target;
        toast("Transaction Confirm Sucessfully...");

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
            {isPending ? "Call Confirm..." : "Confirm"}

          </button>
 
        </form>

        <div>

          <dialog id={id} className="modal max-w-screen-2xl">

            <div className="modal-box">

              <div>

                  <div className="bg-slate-500 text-white">
                    <button className="flex float-right" type="button" onClick={() => (document.getElementById(id)).close()}>
                      <IoClose />
                    </button>
                  </div>   
              </div>
              <h2 className="font-bold pm-4">Confirm Pending</h2>


              <form onSubmit={handleSubmit}>

                <input type="hidden" name="trid" value={transid} />
                <div className="form-control w-full max-w-xs py-4">
                  <label htmlFor="name">Branch Name:<h1 className="font-bold text-blue-800 underline">{values.branchname}</h1></label>
                  
                  {/* <input
                    type="text"
                    id="branchname"
                    name="branchname"
                    className="input input-bordered w-full max-w-xs"
                    value={values.branchname}
                    readOnly
                  /> */}
                </div>
                <div className="form-control w-full max-w-xs py-4">
                  <label htmlFor="image">Description</label>
                  <h5 className="font-bold text-blue-800 underline">{values.description}</h5>
                  {/* <input
                    type="text"
                    id="description"
                    name="description"
                    value={values.description}
                    readOnly
                  /> */}
                </div>
                <div className="form-control w-full max-w-xs py-4">
                  <label htmlFor="price">Amount</label>
                  <h3 className="font-bold text-blue-800 underline">{values.totalamount}</h3>
                  {/* <input
                    type="number"
                    id="totalamount"
                    name="totalamount"
                    value={values.totalamount}
                    readOnly
                  /> */}
                </div>

                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                  type="button"
                  onClick={() => (document.getElementById(id)).close()}
                >
                  Back
                </button>

                <button
                  className="rounded ml-8 bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                  type="submit"
                  disabled={pending}
                >
                  Confirm To Post
                </button>                
              </form>


            </div>
          </dialog>
        </div>

 
      </div>
    </>
  )
}

