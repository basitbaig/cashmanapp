import './globals.css'
import Navbar from "../../components/Navbar";

 
export default function DashboardLayout({ children }) {
  return <section>
           <Navbar />
           {children}
         </section>
}



//https://windframe.devwares.com/editor