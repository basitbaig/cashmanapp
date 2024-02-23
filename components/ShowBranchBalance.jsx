 
//import { getBranchBalance } from "@/model/getdata";

async function BranchHandBalance({branchid}) {
    
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
 
        const res = await fetch(process.env.URL + '/api/cashbalance', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ branchid })
          });
    
          const data = await res.json();

          //const branchbalance = data.balancedata;

          return (
            <>
                {data.map(item => (
                    <div key={item._id}>
                        <p className="text-lg bg-slate-600 text-white font-bold">
                    Cash In Hand Balance: {formatNumber(item.balance)}
                        </p>
                    </div>
                ))}
            </>
          )
        
 
}
 

export default async function ShowBranchBalance ({branchid}) {

    // const [branchbalance, Setbranchbalance]=useState([]);
      
    //const branchbalance = await getBranchBalance({branchid});  
 
    return (
        <div className="float-right mt-3">
            <BranchHandBalance branchid={branchid} />
        </div>
    );
}


 
         