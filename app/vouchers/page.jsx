import React from 'react'

async function fetchvouchers(){
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

 