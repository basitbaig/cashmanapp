import Link from "next/link";

export default function Reportsbar() {
  return (
       // <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> 
        // <!-- Sidenav -->
        <div>
            <nav
                id="sidenav-1"
                className="absolute left-0 top-18 z-[1035] h-full w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
                data-te-sidenav-init
                data-te-sidenav-hidden="false"
                data-te-sidenav-position="absolute">
                <ul className="absolute m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                            data-te-sidenav-link-ref>
                            <span
                                className="mr-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                            </span>
                            <span className="text-4xl font-medium leading-tight  text-blue-700">
                                                
                                Reports
                            </span>
                        </a>
                    </li>

                    <li className="relative mt-9">
                      <Link className="text-md px-8 py-8 " href={'/dashboard'}>
                         <span className="font-bold text-blue-600">Dashboard</span>
                      </Link>
                  </li> 



                  <li className="relative mt-9">
                      <Link className="text-md px-8 py-8" href={{ pathname: '/dashboard/reports/cashledger' }}>
                         Cash Ledger
                      </Link>
                  </li>


                  <li className="relative mt-9">
                      <Link className="text-md px-8 py-8" href={{ pathname: '/dashboard/reports/studentledger' }}>
                         Students Wise Ledger
                      </Link>
                  </li>

                  <li className="relative mt-9">
                      <Link className="text-md px-8 py-8" href={{ pathname: '/dashboard/reports/headwisesummary' }}>
                         Head Wise Summary
                      </Link>
                  </li>                  

                   <li className="relative mt-9">
                      <Link className="text-md px-8 py-8 " href={{ pathname: '/dashboard/reports/rejectentry' }}>
                         Reject Entries List
                      </Link>
                  </li>
    
                  {/*<li className="relative mt-9">
                      <Link className="text-md px-8 py-8 " href={{ pathname: '/dashboard/reports/cancelcash' }}>
                        Cancel Cash Report 
                      </Link>
                  </li>        */}
 
                </ul>
            </nav>

        </div>
  )
}

 