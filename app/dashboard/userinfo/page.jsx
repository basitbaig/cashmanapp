import Userinfo from "@/components/Userinfo";
import { userInfo } from "@/model/getdata";
 

export default async function page() {

  const userlist = await userInfo();

  
  return (
    <div>
      <Userinfo {...userlist} /> 
    </div>    
  );
}
 