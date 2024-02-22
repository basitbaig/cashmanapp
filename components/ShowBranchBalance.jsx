 
import { getBranchBalance } from "@/model/getdata";
 

export default async function ShowBranchBalance ({branchid}) {

    // const [branchbalance, Setbranchbalance]=useState([]);
      
    const branchbalance = await getBranchBalance({branchid});  

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
 
 
    return (
        <div className="float-right mt-3">
            {branchbalance.map(item => (
                <div key={item._id}>
                    <p className="text-lg bg-slate-600 text-white font-bold">
                   Cash In Hand Balance: {formatNumber(item.balance)}
                    </p>
                </div>
            ))}
        </div>
    );
}


 
         