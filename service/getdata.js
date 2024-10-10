import { NextResponse, NextRequest } from "next/server";

//import useSWR from 'swr'
 
//https://swr.vercel.app/docs/getting-started


//https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist

// const fetcher = (...args) => fetch(...args).then(res => res.json())

// function useUser (id) {
//   const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher)
 
//   return {
//     user: data,
//     isLoading,
//     isError: error
//   }
// }
 
export const getLoginUser = async ({email,password}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
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

export const getBranchCash = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    try {     
      
        const res = await fetch('/api/branchcash', { 
            cache: 'no-store',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
            
        });

        const data = await res.json();

        
        return data;

    } catch (error) {
      throw new Error(error);
    }
} 

 
export const getBranchBalance = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
      //  const fetcher = (...args) => fetch(...args).then((res) => res.json());
      //  const { data, error } = useSWR('/api/cashbalance', fetcher)
       // const apiUrl = process.env.API_URL;
       try {   
          const res = await fetch('/api/cashbalance', {
              cache: 'no-store',
              method: "POST",
              body: JSON.stringify({ branchid })
              
            });

 
            const responseData = await res.text(); // Instead of .json(), use .text() first
            //console.log('API Response:', responseData);
            const jsonData = JSON.parse(responseData); // Now parse if it looks fine
      
            //const data = await res.json();

            return jsonData;

          } catch (error) {
            console.error('Error details:', error); // Log the full error
            if (error instanceof SyntaxError) {
              console.error('There was an issue with JSON parsing.');
            }
            throw new Error('Something went wrong while processing the data.'); // A more informative error message
          }
  


}
 
export const getCashTypes = async (entrytype,entrymode) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {
    const res = await fetch('/api/getcashexphead', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({entrytype, entrymode})
    });

  
    if (!res.ok) {
      throw new Error("Cash Type Not Found!!");
    }

    return res.json();

  } catch (error) {
    throw new Error(error);
  }
}  

export const getBranchList = async (comid) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    try {

        const res = await fetch('/api/getbranchlist', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comid)
        });
        

        if (!res.ok) {
          throw new Error("Branch List Not Found!!");
        }
    
        return res.json();

    } catch (error) {
        throw new Error(error);
    }

//    await fetch('/api/getbranchlist', {
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({"comid":"all"})
//     }).then((response) => {
//         return response.json()
//     }).then((data) => {
//         //console.log(data)
//         //setBranchList(data)
//         return data;
//     });

};

export const getAllBranchBalance = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  try {
    const res = await fetch('/api/cashbalanceall', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error("Balance List Not Found!!");
    }

    return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }

}

export const pendingCash = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    
    try {    

        const res = await fetch('/api/pendingcash', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {branchid}),
            cache: 'no-store' 
        });

        if (!res.ok) {
          throw new Error("No Pending Entries Found!!");
        }
 
        return res.json();

    } catch (error) {
        throw new Error("Connection Issue With API Call");
    }

} 

export const getallTransactions = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
    try {     
      
        const res = await fetch('/api/alltransactions', { 
            cache: 'no-store',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
            
        });

        const data = await res.json();

        
        return data;

    } catch (error) {
      throw new Error(error);
    }
} 

export async function findTransaction({transactionid}){
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
 
    return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }
}

export const userInfo = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
 
  try {     
    const res = await fetch('/api/userinfo', {
      cache: 'no-store',
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("No User Entries Found!!");
    }
    
    const data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
    throw new Error("Connection Issue With API Call");
  }
};
 
 
export async function updateUser({userid, action}){
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {
         
      const res = 
        action=="Delete" ? 
          await fetch('/api/updateuser', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid, action })
          })
        :        
          await fetch('/api/updateuser', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid, action })
          })
        
        if (!res.ok) {
          throw new Error("User Record Not Updated!!");
        }
 
       return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }
}

export async function cancelTransaction({transid, branchid}){
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {
         
      const res = await fetch('/api/canceltransaction', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transid, branchid })
          })
        
        if (!res.ok) {
          throw new Error("Transaction Record Not Found!!");
        }
 
       return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }
}


export const getReportCash = async ({branchid, feehead, report}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {     
    
      const res = await fetch('/api/branchcash', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branchid,feehead,report }),
          cache: 'no-store'
      });

      const data = await res.json();

      
      return data;

  } catch (error) {
    throw new Error(error);
  }
} 

export const getStudentLedger = async ({comid, report}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {     
      const res = await fetch('/api/branchstudentcash', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comid,report }),
          cache: 'no-store'
      });

      const data = await res.json();

      
      return data;

  } catch (error) {
    throw new Error(error);
  }
} 


export const getCollectionSummary = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {     
      const res = await fetch('/api/collectionsummary', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branchid }),
          cache: 'no-store'
      });

      const data = await res.json();

      
      return data;

  } catch (error) {
    throw new Error(error);
  }
} 

export const getRejectEntries = async ({branchid}) => {
  const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  try {     
      const res = await fetch('/api/getrejectentry', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branchid }),
          cache: 'no-store'
      });

      //const data = await res.json();

      return  res.json();

  } catch (error) {
    throw new Error(error);
  }
} 





// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await Topic.findByIdAndDelete(id);
//   return NextResponse.json({message: "Topic Deleted Successfully.."}, {status: 200});
// }





const getFeeData = () => {
    fetch('feedata.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json()
    }).then((data) => {
      //console.log(data)
      return data.feebilling;
    });
  };
  
  const GetApiData = async () => {
  
    const apiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL;
  
    const feedata = getFeeData();
  
    try {
      const response = await fetch(apiUrl + '/api/fetchandpostapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedata })
      });
  
      const data = await response.json();
  
  
      if (data.success) {
        console.log('Data inserted successfully with ID:', data.insertedId);
      } else {
        console.error('Failed to insert data:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  
  
    // var myInit = {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(feedata)
    // };
  
    // const res = await fetch('api/fetchandpostapi', myInit)
    //     .then(result => result.text())
    //     .then(data => console.log(data));
  
  
  
    // if (res.ok) {
    //     console.log('Data Inserted');
    // } else {
    //     const errorMesg = await res.json();
    //     console.log(errorMesg.message);
    // }
  }
  