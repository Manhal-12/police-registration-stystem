import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import Footer from "../components/Footer";

import {
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";



const Dashboard = () => {


const API="https://localhost:7001";


const bg =
"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80";



const [citizens,setCitizens]=useState([]);

const [officers,setOfficers]=useState([]);

const [registrations,setRegistrations]=useState([]);


const [showModal,setShowModal]=useState(false);


const [editMode,setEditMode]=useState(false);



const [form,setForm]=useState({

registrationID:0,
registrationDate:"",
citizenID:"",
officerID:""

});




useEffect(()=>{

loadData();

},[]);





const loadData=async()=>{

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



}catch(error){

console.log(error);

}


};





const saveRegistration=async()=>{


let url =
editMode
?
`${API}/api/Registrations`
:
`${API}/api/Registrations`;



await fetch(url,{

method:
editMode ? "PUT":"POST",


headers:{
"Content-Type":"application/json"
},


body:JSON.stringify(form)


});



setShowModal(false);

setEditMode(false);


loadData();


};







const deleteRegistration=async(id)=>{


if(!window.confirm("Delete registration?"))
return;



await fetch(

`${API}/api/Registrations/${id}`,

{

method:"DELETE"

}

);



loadData();


};





const editRegistration=(item)=>{


setForm({

registrationID:item.registrationID,

registrationDate:
item.registrationDate.substring(0,10),

citizenID:item.citizenID,

officerID:item.officerID

});


setEditMode(true);

setShowModal(true);


};





const chartData=[

{
name:"Citizens",
value:citizens.length
},

{
name:"Officers",
value:officers.length
},

{
name:"Registrations",
value:registrations.length
}

];



const COLORS=[
"#3b82f6",
"#22c55e",
"#f59e0b"
];





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
flex
">



<Sidebar />



<div className="
flex-1
p-6
">


<Navbar />



<div className="
grid
md:grid-cols-3
gap-8
mt-8
">



<DashboardCard

title="Total Citizens"

count={citizens.length}

icon={<FaUsers/>}

/>




<DashboardCard

title="Total Officers"

count={officers.length}

icon={<FaUserShield/>}

/>




<DashboardCard

title="Total Registrations"

count={registrations.length}

icon={<FaClipboardList/>}

/>



</div>





<div className="
mt-10
bg-white/20
rounded-3xl
p-6
w-[450px]
">



<h2 className="
text-white
text-2xl
font-bold
">

Police Statistics

</h2>



<PieChart

width={400}

height={300}

>


<Pie

data={chartData}

cx="50%"

cy="50%"

outerRadius={100}

dataKey="value"

label


>


{

chartData.map((x,i)=>(

<Cell

key={i}

fill={COLORS[i]}

/>

))

}


</Pie>



<Tooltip/>

<Legend/>


</PieChart>



</div>
{/* TABLE */}

<div className="
mt-10
bg-white/20
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
overflow-x-auto
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-white
text-2xl
font-bold
">

Recent Registrations

</h2>



<button

onClick={()=>{

setForm({

registrationID:0,
registrationDate:"",
citizenID:"",
officerID:""

});

setEditMode(false);

setShowModal(true);

}}

className="
bg-green-500
text-white
px-5
py-2
rounded-xl
flex
gap-2
items-center
"

>

<FaPlus/>

Add

</button>


</div>





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
Action
</th>


</tr>

</thead>



<tbody>


{

registrations.map(item=>(


<tr

key={item.registrationID}

className="
text-center
border-b
hover:bg-white/10
"


>



<td className="p-4">

{item.registrationID}

</td>



<td>

{item.citizenName}

</td>




<td>

{item.officerName}

</td>




<td>

{
new Date(
item.registrationDate
).toLocaleDateString()
}

</td>




<td>


<div className="
flex
gap-3
justify-center
">



<button

onClick={()=>editRegistration(item)}

className="
bg-blue-500
px-3
py-2
rounded
"

>

<FaEdit/>

</button>






<button

onClick={()=>deleteRegistration(
item.registrationID
)}

className="
bg-red-500
px-3
py-2
rounded
"

>

<FaTrash/>

</button>



</div>


</td>



</tr>


))


}



</tbody>


</table>


</div>






{/* MODAL */}


{

showModal && (


<div className="
fixed
inset-0
bg-black/60
flex
items-center
justify-center
">


<div className="
bg-white
p-8
rounded-2xl
w-[400px]
">



<h2 className="
text-xl
font-bold
mb-5
">

{
editMode
?
"Edit Registration"
:
"Add Registration"
}

</h2>






<input

type="date"

className="
border
p-3
w-full
mb-3
"


value={form.registrationDate}


onChange={(e)=>

setForm({

...form,

registrationDate:e.target.value

})

}


/>







<select

className="
border
p-3
w-full
mb-3
"


value={form.citizenID}


onChange={(e)=>

setForm({

...form,

citizenID:e.target.value

})

}

>


<option>
Select Citizen
</option>


{

citizens.map(c=>(


<option

key={c.citizenID}

value={c.citizenID}

>

{c.fullName}

</option>


))

}


</select>








<select

className="
border
p-3
w-full
mb-3
"


value={form.officerID}


onChange={(e)=>

setForm({

...form,

officerID:e.target.value

})

}


>


<option>

Select Officer

</option>



{

officers.map(o=>(


<option

key={o.officerID}

value={o.officerID}

>

{o.fullName}

</option>


))


}



</select>






<div className="
flex
gap-3
">


<button

onClick={saveRegistration}

className="
bg-green-600
text-white
px-5
py-2
rounded
"

>

Save

</button>



<button

onClick={()=>setShowModal(false)}

className="
bg-gray-500
text-white
px-5
py-2
rounded
"

>

Cancel

</button>



</div>


</div>


</div>


)

}




<Footer />


</div>


</div>


</div>


);


};


export default Dashboard;