
import { NextResponse } from "next/server";  

//https://nextjs.org/docs/pages/building-your-application/deploying/production-checklist
 
export const getLoginUser = async ({email,password}) => {
  
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
  const apiUrl = process.env.API_URL;
    try {     
      
        const res = await fetch(`${apiUrl}/api/branchcash`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
        }, { cache: 'force-cache' });

        const data = await res.json();

        return data;

    } catch (error) {
      throw new Error(error);
    }

} 
 
export const getCashTypes = async (entrytype) => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/getcashexphead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entrytype)
    }, { cache: 'force-cache' }).then(response => response.json());


    if (!res.ok) {
      throw new Error("Balance List Not Found!!");
    }

    return res.json();

  } catch (error) {
    throw new Error(error);
  }
}  

export const getBranchList = async (comid) => {
  const apiUrl = process.env.API_URL;
    try {

        const res = await fetch(`${apiUrl}/api/getbranchlist`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comid)
        }, { cache: 'force-cache' }).then(response=> response.json());
        

        if (!res.ok) {
          throw new Error("Balance List Not Found!!");
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
  const apiUrl = process.env.API_URL;

  //console.log(`${apiUrl}/api/cashbalanceall`);

  try {
    const res = await fetch(`${apiUrl}/api/cashbalanceall`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error("Balance List Not Found!!");
    }

    return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }

}

export const pendingCash = async ({branchid}) => {
  const apiUrl = process.env.API_URL;

    try {    

        const res = await fetch(`${apiUrl}/api/pendingcash`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
        }, { cache: 'no-store' });

        if (!res.ok) {
          throw new Error("No Pending Entries Found!!");
        }
     
        return res.json();

    } catch (error) {
        throw new Error("Connection Issue With API Call");
    }

} 


export const userInfo = async () => {
  const apiUrl = process.env.API_URL;
  try {     
      const res = await fetch(`${apiUrl}/api/userinfo`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
      }, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error("No Pending Entries Found!!");
      }
   
      return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }

} 
 

export async function findTransaction({transactionid}){
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/getpendingentry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionid })
    }, { cache: 'no-store' });


    if (!res.ok) {
      throw new Error("No Pending Entries Found!!");
    }
 
    return res.json();

  } catch (error) {
    throw new Error("Connection Issue With API Call");
  }
}
 
 






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
  
    const apiUrl = process.env.API_URL;
  
    const feedata = getFeeData();
  
    try {
      const response = await fetch(`${apiUrl}/api/fetchandpostapi`, {
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
  