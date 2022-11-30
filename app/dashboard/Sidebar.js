
import React from "react";
 
async function fetchRecipients() {
    const res = await fetch('/api/recipients')
    return res.json()
    //return [];
};
 
async function Sidebar() {
 const recipients = await fetchRecipients();
 return (
   <div className="fixed left-4 h-[96vh] w-[20%] p-4">
     <div className="flex w-full h-full rounded-md border-2 border-black bg-blue-50">
       <div className="flex w-full justify-center items-between">
         <div className="w-full">
           <h3 className="text-center border-b-2 border-black">
             Gift Recipients
           </h3>
         </div>
       </div>
     </div>
   </div>
 );
};
 
export default Sidebar;