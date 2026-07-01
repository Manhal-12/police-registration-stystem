import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";


const Registrations = () => {


const API="https://localhost:7001";


const bg =
"https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2000&q=80";



const [search,setSearch]=useState("");

const [registrations,setRegistrations]=useState([]);

const [citizens,setCitizens]=useState([]);

const [officers,setOfficers]=useState([]);


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


let r =
await fetch(`${API}/api/Registrations`);

setRegistrations(await r.json());



let c =
await fetch(`${API}/api/Citizen`);

setCitizens(await c.json());



let o =
await fetch(`${API}/api/Officers`);

setOfficers(await o.json());



}catch(error){

console.log(error);

}


};








const saveRegistration=async()=>{


await fetch(

`${API}/api/Registrations`,

{


method:
editMode ? "PUT":"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify(form)


}

);



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








const editRegistration=(r)=>{


setForm({

registrationID:r.registrationID,

registrationDate:
r.registrationDate.substring(0,10),

citizenID:r.citizenID,

officerID:r.officerID

});


setEditMode(true);

setShowModal(true);


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

Registrations

</h1>


<p className="text-blue-200">

Manage registration records

</p>

</div>





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
bg-blue-600
text-white
px-6
py-3
rounded-full
"

>

<FaPlus className="inline mr-2"/>

Add Registration

</button>



</div>









<div className="mt-8">


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

className="
outline-none
ml-3
w-full
"

placeholder="Search registration..."

onChange={(e)=>setSearch(e.target.value)}

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
Action
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



<button

onClick={()=>editRegistration(r)}

className="
bg-green-500
p-2
rounded
mr-2
"

>

<FaEdit/>

</button>





<button

onClick={()=>deleteRegistration(
r.registrationID
)}

className="
bg-red-500
p-2
rounded
"

>

<FaTrash/>

</button>



</td>




</tr>


))


}



</tbody>



</table>



</div>







{
showModal &&


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
rounded-xl
w-96
">


<h2 className="font-bold text-xl mb-4">

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






<button

onClick={saveRegistration}

className="
bg-blue-600
text-white
px-5
py-2
rounded
mr-2
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


}




</div>


</div>


);


};


export default Registrations;