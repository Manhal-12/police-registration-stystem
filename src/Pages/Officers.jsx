import React, { useEffect, useState } from "react";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash
} from "react-icons/fa";


const Officers = () => {


const API="https://localhost:7001";


const bg =
"https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=2000&q=80";



const [search,setSearch] = useState("");

const [officers,setOfficers] = useState([]);


const [showModal,setShowModal]=useState(false);

const [editMode,setEditMode]=useState(false);



const [form,setForm]=useState({

officerID:0,
fullName:"",
rankName:"",
phone:""

});





useEffect(()=>{

loadOfficers();

},[]);





const loadOfficers=async()=>{

try{

const res =
await fetch(`${API}/api/Officers`);

const data =
await res.json();


setOfficers(data);


}catch(error){

console.log(error);

}

};






const saveOfficer=async()=>{


await fetch(

editMode
?
`${API}/api/Officers`
:
`${API}/api/Officers`,

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


loadOfficers();


};






const deleteOfficer=async(id)=>{


if(!window.confirm("Delete Officer?"))
return;



await fetch(

`${API}/api/Officers/${id}`,

{

method:"DELETE"

}

);



loadOfficers();


};






const editOfficer=(o)=>{


setForm({

officerID:o.officerID,

fullName:o.fullName,

rankName:o.rankName,

phone:o.phone

});


setEditMode(true);

setShowModal(true);


};





return (


<div

className="min-h-screen bg-cover bg-center"

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

Officers

</h1>


<p className="text-blue-200">

Manage police officers records

</p>


</div>





<button

onClick={()=>{

setForm({

officerID:0,
fullName:"",
rankName:"",
phone:""

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

Add Officer


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
w-full
md:w-96
">


<FaSearch/>


<input

className="
outline-none
ml-3
w-full
"

placeholder="Search officer..."

onChange={(e)=>setSearch(e.target.value)}

/>


</div>


</div>









<div className="
mt-8
bg-white/20
backdrop-blur-xl
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
Full Name
</th>


<th>
Rank
</th>


<th>
Phone
</th>


<th>
Action
</th>


</tr>

</thead>






<tbody>


{

officers

.filter(o=>

o.fullName
.toLowerCase()
.includes(search.toLowerCase())

)

.map(o=>(


<tr

key={o.officerID}

className="
text-center
border-b
"

>


<td className="p-4">

{o.officerID}

</td>


<td>

{o.fullName}

</td>


<td>

{o.rankName}

</td>


<td>

{o.phone}

</td>



<td>


<button

onClick={()=>editOfficer(o)}

className="
bg-green-500
p-2
rounded-lg
mr-2
"

>

<FaEdit/>

</button>





<button

onClick={()=>deleteOfficer(o.officerID)}

className="
bg-red-500
p-2
rounded-lg
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



<h2 className="text-xl font-bold mb-4">

{
editMode
?
"Edit Officer"
:
"Add Officer"
}

</h2>




<input

className="border p-3 w-full mb-3"

placeholder="Full Name"

value={form.fullName}

onChange={(e)=>

setForm({
...form,
fullName:e.target.value
})

}


/>



<input

className="border p-3 w-full mb-3"

placeholder="Rank"

value={form.rankName}

onChange={(e)=>

setForm({
...form,
rankName:e.target.value
})

}


/>




<input

className="border p-3 w-full mb-3"

placeholder="Phone"

value={form.phone}

onChange={(e)=>

setForm({
...form,
phone:e.target.value
})

}


/>




<button

onClick={saveOfficer}

className="
bg-blue-600
text-white
px-5
py-2
rounded
mr-3
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


export default Officers;