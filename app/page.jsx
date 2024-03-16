import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation";
 

export default async function Home() {
 
   return (
      <main>
         <div>
            <LoginForm />
         </div>
      </main>
   );
}


////https://cashmanapp.vercel.app


//https://github.com/vercel/next.js/tree/canary/examples

//https://github.com/vercel/next.js/tree/canary/examples/with-docker

//https://nextjs.org/docs/pages/building-your-application/deploying#docker-image