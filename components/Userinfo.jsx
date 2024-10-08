"use client";

import { getCookie, getCookies } from 'cookies-next';
import {useState, useEffect } from 'react';
import { IconContext } from "react-icons";
import { TiUserDelete } from "react-icons/ti";
import { BsTrash3 } from "react-icons/bs";
import { GrUserNew } from "react-icons/gr";
import { userInfo, updateUser } from "@/service/getdata";
 


export default function Userinfo() {
    
   //...props

    const username = getCookie('username');
    const branchid = getCookie('branchid');
    const usertype = getCookie('usertype');
    const userrole = getCookie('userrole');
    const firstlogin = getCookie('firstlogin');

    //const userlist = [...Object.values(props)];
    //...Object.values(props)

    const [userlist, setUserlist] = useState([]);
    const [loading, setLoading] = useState(false);
 
  
    //await userInfo()

    const CallUserList = async () => {

      setUserlist(await userInfo());
    }


    const CallUpdateUser = async (userid,action) => {

      //<Link to={`#`} onClick={() => {if(window.confirm('Are you sure to delete this record?')){ this.deleteHandler(item.id)};}}> <i className="material-icons">Delete</i> </Link>
      //console.log(userid,action)

      await updateUser({userid,action});
      
      CallUserList();
      
      //setUserlist(await updateUser({userid,action}));
 
      
    }

    function handleActive (userid,status) {
      //e.preventDefault();
      //console.log(status);
      CallUpdateUser(userid,status == false ? "InActive" : "Active")
     
       
    }

    function handleDelete (userid) {
      //e.preventDefault();
      CallUpdateUser(userid,"Delete");
      
      
 
    };    

    useEffect(() => {
      // Call the function on the initial load
      CallUserList();
     
    }, []);


    // useEffect(() => {
    //   if (transactionTrigger) {
    //     console.log('Now Calling API for Fresh user information');
    //     CallUserList();
    //     setTransactionTrigger(false); // Reset the trigger
    //   }
    // }, [transactionTrigger]);



    // useEffect(() => {

    //   if (userdata.length==0 || recordchange==true)
    //   {
        
    //     setRecordChange(false);
    //   }                
    // }, [userdata]);   

    //Filter array to create new array on condition
    // setArtists(                                                                                                                                                                                                                                                                      
    //   artists.filter(a =>
    //     a.id !== artist.id
    //   )
    // );



  return (
    
      <div className="md:container md:mx-auto">
        <div className="relative overflow-x-auto mt-8">
 
          <table className="table-fixed min-w-full text-left text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr className="border-b dark:border-neutral-500">
                  <th className="px-4 py-2">Branch</th>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">User Role</th>
                  <th className="px-4 py-2">User Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody className="border-b dark:border-neutral-500">
                {
                  userlist.map((item) => {
                    
                    return <tr className="border-b dark:border-neutral-500" key={item._id}>
                      <td className="whitespace-nowrap  px-3 py-2">{item.branchname}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.name}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.email}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.userrole}</td>
                      <td className="whitespace-nowrap  px-3 py-2">{item.usertype}</td>
                      <td>
                      {item.isactive ? "Active" : "InActive"}
                        {/* <PostPending transid={item._id.toString()} />
                        
                        */}
                      </td>

                      <td>                        
                          <button onClick={() => handleActive(item._id,item.isactive)}>
                          <IconContext.Provider value={{ color: 'navy', size: 22 }}>
                            {item.isactive ? <TiUserDelete /> :  <GrUserNew />}                            
                          </IconContext.Provider>                                                      
                          </button>
                          <span className="gap-5 px-5"></span>

                          {/* handleDelete(item._id,item.isactive)} */}
                         
                          <button onClick={() => {if(window.confirm('Are you sure to delete this user?')){ handleDelete(item._id)};}}>
                          <IconContext.Provider value={{ color: 'navy', size: 22 }}>
                              <BsTrash3 />
                          </IconContext.Provider>                                                      
                          </button>


                      </td>
                    </tr>                                                        
                  })
                }
                {userlist.length === 0 && (
                  <tr className="text-center"><td>No User Record.</td></tr>
                )}

              </tbody>
 
          </table>

         

        </div>

      </div>
    );
}

 