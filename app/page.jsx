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