import { connectMongoDB } from "@/dblib/mongodb";
import { NextResponse } from "next/server";  
 
export const getLoginUser = async ({email,password}) => {

  try {
    
      const res = await fetch('/api/checklogin', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
  
        const data = await res.json();
        
        return data;
      
  } catch (error) {
      throw new Error("User Not Found");
  }
        
}

export const getBranchBalance = async ({branchid}) => {
    try {
        const res = await fetch('/api/cashbalance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
          });
    
          const data = await res.json();
          return data;
        
    } catch (error) {
        throw new Error("Balance Not Found");
    }
          
}

export const getBranchCash = async ({branchid}) => {

    try {     
        const res = await fetch('/api/branchcash', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
        });

        const data = await res.json();

        //return NextResponse.json(data);
        
        
        return data;

    } catch (error) {
        throw new Error("Transaction Not Found");
    }

} 
 
export const getCashTypes = async (entrytype) => {
 
    const res = await fetch('/api/getcashexphead', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entrytype)
    }).then(response=> response.json());
  
    const data = await res;

    // console.log(data);
    // console.log('----Next Resposense Data----');
    // console.log(NextResponse.json(data));

    // return NextResponse.json(data);
   
    return data; 
  }  

export const getBranchList = async (comid) => {
     
    try {

        const res = await fetch('/api/getbranchlist', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comid)
        }).then(response=> response.json());
        
        const data = await res;

        //return NextResponse.json(data);

        return data;
        
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
 
    const res = await fetch('/api/cashbalanceall', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    //return NextResponse.json(data);

    return data;

}

export const pendingCash = async ({branchid}) => {

    try {     
        const res = await fetch('/api/pendingcash', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
        });

        const data = await res.json();

        //return NextResponse.json(data);
        
        return data;

    } catch (error) {
        throw new Error("No Pending Transaction");
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
  
    //const feedata = await getAPIData();
  
    const feedata = getFeeData();
  
    try {
      const response = await fetch(process.env.NEXTAUTH_URL +'/api/fetchandpostapi', {
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
  