
// import { connectMongoDB } from "@/dblib/mongodb";
// import Branchcashbook from "@/model/branchcash";
// import Financecashbook from "@/model/hofincash";


// export async function createBranchEntry(FormData) {
 
//     const data = FormData
//     try {
//         await connectMongoDB();
//         const branchcash = new Branchcashbook(data)
//         await branchcash.save()
//         revalidatePath('/')
//         // return { message: `Created product ${data.name}` }

//         return { message: "Transaction Created"}

//     } catch (error) {
//         return { message: 'Failed to create product' }
//     }
// }

// export async function deleteBranchEntry(FormData){
 
//     try {
//         await connectMongoDB();
//         await Branchcashbook.findOneAndDelete({_id: FormData.transid})
//         revalidatePath('/')
//         // console.log({ message: `Deleted product ${data.name}`})
//         // return { message: `Deleted product ${data.name}`}

//         return { message: "Transaction Deleted" }

//     } catch (error) {
//         return { message: 'Faild to delete product' }
//     }
// }


//  //revalidatePath('/')


// export async function updateBranchEntry(FormData){
 
//     const data = FormData
//     try {         
//         await connectMongoDB();
//         await Branchcashbook.findOneAndUpdate({_id: data.transid},data)
//         revalidatePath('/')
//         // console.log({ message: `Updated product ${data.name}`})
//         // return { message: `Updated product ${data.name}`}
//         return { message: "Transaction Updated" }

//     } catch (error) {
//         return { message: 'Fail to update entry' }
//     }
// }


// export async function confirmBranchEntry(FormData){
 
//     const data = FormData
//     try {         
//         await connectMongoDB();
//         await Branchcashbook.findOneAndUpdate({_id: data.transid},data)
//         revalidatePath('/')
//         // console.log({ message: `Updated product ${data.name}`})
//         // return { message: `Updated product ${data.name}`}
//         return { message: "Transaction Confirm" }

//     } catch (error) {
//         return { message: 'Fail to update entry' }
//     }
// }