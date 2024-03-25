import React from 'react'



async function fetchvouchers(){

  const feecollection = [
    {
      "comid": 1,
      "branchid": 2,
      "feebillid": 999888777,
      "rollno": 12541,
      "studentname": "Test Student",
      "feemonths": "JANUARY2024",
      "challanid": 123456789,
      "totalamount": 50250,
      "receivedate": "2024-03-21",
      "description": "Fee Received In Cash"
    }
  ]
  
    const response = await fetch('/api/feevouchers', {
        //cache: "force-cache", //<SSG-getStaticSideProps
        //cache:"no-store", ///SSR-getServerSideProps
        next: {
            revalidate: 20, ///ISR-revalidate
        },
    });
    const data = await response.json();
    return data;
}

export default async function Page() {

  return (
    <div>page</div>
  )
}

 