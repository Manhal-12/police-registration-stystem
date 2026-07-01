import React,{useEffect,useState} from "react";

import {
FaUsers,
FaUserShield,
FaClipboardList,
FaSearch,
FaPrint
} from "react-icons/fa";


const Reports=()=>{


const API="https://localhost:7001";



const bg =
"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80";




const [search,setSearch]=useState("");



const [citizens,setCitizens]=useState([]);

const [officers,setOfficers]=useState([]);

const [registrations,setRegistrations]=useState([]);







useEffect(()=>{

loadReports();

},[]);






const loadReports=async()=>{


try{


let c =
await fetch(`${API}/api/Citizen`);

setCitizens(await c.json());




let o =
await fetch(`${API}/api/Officers`);

setOfficers(await o.json());





let r =
await fetch(`${API}/api/Registrations`);

setRegistrations(await r.json());



}

catch(err){

console.log(err);

}



};








return (


<div

className="
min-h-screen
bg-cover
bg-center
"

style={{
backgroundImage:`url(${bg})`
}}

>


<div className="
min-h-screen
bg-blue-950/80
p-8
">







<div className="
bg-white/20
backdrop-blur-xl
rounded-3xl
p-6
flex
justify-between
items-center
">



<div>

<h1 className="
text-white
text-4xl
font-bold
">

Reports

</h1>


<p className="text-blue-200">

System reports and statistics

</p>


</div>




<button

onClick={()=>window.print()}

className="
bg-white
text-blue-700
px-6
py-3
rounded-full
"

>


<FaPrint className="inline mr-2"/>

Print


</button>




</div>









<div className="
grid
md:grid-cols-3
gap-8
mt-10
">







<div className="
bg-white/20
rounded-3xl
p-8
text-white
shadow-xl
">


<FaUsers size={45}/>


<h2 className="text-5xl font-bold mt-5">

{citizens.length}

</h2>


<p>

Total Citizens

</p>


</div>









<div className="
bg-white/20
rounded-3xl
p-8
text-white
shadow-xl
">


<FaUserShield size={45}/>


<h2 className="text-5xl font-bold mt-5">

{officers.length}

</h2>


<p>

Total Officers

</p>


</div>









<div className="
bg-white/20
rounded-3xl
p-8
text-white
shadow-xl
">


<FaClipboardList size={45}/>


<h2 className="text-5xl font-bold mt-5">

{registrations.length}

</h2>


<p>

Registrations

</p>


</div>





</div>










<div className="mt-10">


<div className="
bg-white
rounded-xl
flex
items-center
px-5
py-3
w-96
">


<FaSearch/>


<input


placeholder="Search report..."


className="
outline-none
ml-3
w-full
"


onChange={(e)=>

setSearch(e.target.value)

}


/>


</div>


</div>









<div className="
mt-8
bg-white/20
rounded-3xl
p-6
overflow-x-auto
">





<table className="w-full text-white">



<thead>


<tr className="border-b">



<th className="p-4">
ID
</th>


<th>
Citizen
</th>


<th>
Officer
</th>


<th>
Date
</th>


<th>
Status
</th>



</tr>


</thead>







<tbody>




{

registrations


.filter(r=>

r.citizenName
?.toLowerCase()
.includes(search.toLowerCase())

)



.map(r=>(



<tr

key={r.registrationID}

className="
text-center
border-b
"


>



<td className="p-4">

{r.registrationID}

</td>





<td>

{r.citizenName}

</td>





<td>

{r.officerName}

</td>





<td>


{
new Date(
r.registrationDate
).toLocaleDateString()
}


</td>





<td>


<span className="
bg-green-500
px-4
py-1
rounded-full
">


Completed


</span>


</td>




</tr>


))


}



</tbody>



</table>





</div>







</div>


</div>



);


};


export default Reports;