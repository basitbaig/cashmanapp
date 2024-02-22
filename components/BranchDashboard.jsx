"use client";


import Navbar from "@/components/Navbar";
import ShowBranchBalance from "@/components/ShowBranchBalance";
import ShowBranchDashboard from "@/components/ShowBranchDashboard";
import ShowPendingCash from "@/components/ShowPendingCash";
import { useState } from "react";
//import { useSession } from "next-auth/react";
// import { getServerSession  } from "next-auth/next";
// import { authOptions } from "@app/api/auth/[...nextauth]"; // ⚠️ Make sure this is the correct path
import { setCookie, getCookie, getCookies } from 'cookies-next';

//https://www.appsloveworld.com/tag/reactjs-programs-examples


export default function BranchDashboard() {


  // const session = await getServerSession(authOptions);

  // const [callapi, SetCallApi] = useState(true);
  const username = getCookie('username');
  const branchid = getCookie('branchid');
  const usertype = getCookie('usertype');
  const userrole = getCookie('userrole');
  const firstlogin = getCookie('firstlogin');

  const [showMe, setShowMe] = useState(false);

  function toggle(e){
    e.preventDefault();
    
    setShowMe(!showMe);
  }

  //Format Data as per Customize Style
  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [day, month, year].join('-');
  }

  //Make Coma Separated Number
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }

  return (

    <div className="md:container md:mx-auto">



      <div className="flex flex-col gap-2">

        <Navbar username={decodeURIComponent(username)} userrole={decodeURIComponent(userrole)} firstlogin={decodeURIComponent(firstlogin)} />

      </div>

      {/* <div>
        <button
          type="button"
          onClick={GetApiData}
        >
          ---
        </button>
      </div> */}

      <div className="bg-gray-200 min-h-screen">

        <div class="max-w-6xl mx-auto px-8 py-8">
        
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" onClick={toggle}>{showMe?"Hide Pending Entries":"Show Pending Entries"}</button>

          <div style={{display: showMe?"block":"none" }}>
            {/* <div className="w-1/4 mt-14"> */}
            <ShowPendingCash branchid={decodeURIComponent(branchid)} />
            {/* </div> */}
          </div>



          {/* <div className="w-3/4"> */}
          <div className="float-right {showMe ? mt-1 : mt-0}">
            <ShowBranchBalance branchid={decodeURIComponent(branchid)} />
          </div>

          <div className="{showMe ? mt-11 : mt-0}">
            <ShowBranchDashboard branchid={decodeURIComponent(branchid)} />
          </div>
          {/* </div> */}

        </div>
      </div>
    </div>
  );
}


// function loadFeedPosts(
//   createdAtMax,
//   limit
// ) {
//   return db
//     .collection("posts")
//     .orderBy("createdAt", "desc")
//     .where("createdAt", "<", createdAtMax)
//     .limit(limit)
//     .get()
//     .then(getDocsFromSnapshot)
// }

// function Feed() {
//   const [posts, setPosts] = useState([])
//   const [currentTime, setCurrentTime] = useState(Date.now())
//   const [limit, setLimit] = useState(3)

//   useEffect(() => {
//     loadFeedPosts(currentTime, limit).then(posts => {
//       setPosts(posts)
//     })
//   }, [currentTime, limit])

//   return (
//     <div>
//       <h1>Testing this usefull function for data retrevial</h1>
//     </div>
//   )
// }


//db.branchcashbooks.aggregate( [ { $group:{ _id: { branch:"$branchid", enttype:"$entrytype"} , Total:{ $sum: "$totalamount" } } }  ])


//https://www.youtube.com/watch?v=FprmF6nmkWY&list=PL4RCxklHWZ9v3eIqQeKWcoNPSiLuVPyac

//https://www.youtube.com/watch?v=MWmMvudBgFU
