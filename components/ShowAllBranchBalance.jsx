
import { getAllBranchBalance } from '@/model/getdata'
 

export default async function ShowAllBranchBalance() {

    //const [branchbalance,Setbranchbalance]=useState([]);

    const branchbalance = await getAllBranchBalance(); 

    let grosstotal = 0;
     

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

 

    return (
        <div>
            {/* {branchbalance.map(item => (
                <div key={item._id}>
                    <p className="text-lg decoration-indigo-500 bg-indigo-700 text-white font-bold">
                   Cash In Hand Balance: {formatNumber(item.balance)}
                    </p>
                </div>
            ))} */}
          
            <div className="px-5">
                <table className="table-fixed min-w-full text-left text-sm font-light">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                        <tr className="border-b dark:border-neutral-500">
                            <th className="px-4 py-2">Branch Name</th>
                            <th className="px-4 py-2">Cash In Hand</th>
                        </tr>
                    </thead>
                    {/* <APIData /> */}
                    <tbody className="border-b dark:border-neutral-500">
                        {
                            branchbalance.map((item) => {
                                grosstotal += Number(item.balance);
                                return <tr className="border-b dark:border-neutral-500" key={item._id}>
                                    <td className="whitespace-nowrap  px-3 py-2">{item.Branch}</td>
                                    <td className="whitespace-nowrap  text-center">{formatNumber(item.balance)}</td>
                                </tr>
                                //grosstotal = grosstotal + {parseInt(item.balance)};                                                            
                            })
                        }
                        {branchbalance.length === 0 && (
                            <p className="text-center">Branch Balance Not Available.</p>
                        )}

                    </tbody>
                    <tfoot className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                        <tr>                                                                   
                            <th className="pl-5">Total Cash In Hand</th>
                            <td className="whitespace-nowrap text-center text-green">
                                {formatNumber(grosstotal)}
                            </td>        
                        </tr>
                    </tfoot>                    
                </table>
            </div>

        </div>

    );
}
