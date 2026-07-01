import React,{useEffect,useState} from "react";

import {
FaSearch,
FaPlus,
FaEdit,
FaTrash
} from "react-icons/fa";


const Citizens=()=>{


const API="https://localhost:7001";


const bg =
"https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=2000&q=80";



const [search,setSearch]=useState("");

const [citizens,setCitizens]=useState([]);


const [showModal,setShowModal]=useState(false);

const [editMode,setEditMode]=useState(false);



const [form,setForm]=useState({

citizenID:0,
fullName:"",
gender:"",
dateOfBirth:"",
address:"",
phone:""

});





useEffect(()=>{

loadCitizens();

},[]);





const loadCitizens=async()=>{


try{


let res =
await fetch(`${API}/api/Citizen`);


let data =
await res.json();


setCitizens(data);


}

catch(err){

console.log(err);

}


};









const saveCitizen=async()=>{


await fetch(

`${API}/api/Citizen`,

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


loadCitizens();


};







const deleteCitizen=async(id)=>{


if(!window.confirm("Delete citizen?"))
return;



await fetch(

`${API}/api/Citizen/${id}`,

{

method:"DELETE"

}

);



loadCitizens();


};







const editCitizen=(c)=>{


setForm({

citizenID:c.citizenID,

fullName:c.fullName,

gender:c.gender,

dateOfBirth:
c.dateOfBirth.substring(0,10),

address:c.address,

phone:c.phone

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

Citizens

</h1>


<p className="text-blue-200">

Manage citizens records

</p>

</div>




<button

onClick={()=>{


setForm({

citizenID:0,
fullName:"",
gender:"",
dateOfBirth:"",
address:"",
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

Add Citizen


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
ml-3
outline-none
w-full
"

placeholder="Search citizen..."

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


<th>ID</th>

<th>Name</th>

<th>Gender</th>

<th>DOB</th>

<th>Address</th>

<th>Phone</th>

<th>Action</th>


</tr>


</thead>





<tbody>



{

citizens

.filter(c=>

c.fullName
.toLowerCase()
.includes(search.toLowerCase())

)


.map(c=>(



<tr

key={c.citizenID}

className="
text-center
border-b
"


>


<td className="p-4">

{c.citizenID}

</td>



<td>

{c.fullName}

</td>



<td>

{c.gender}

</td>




<td>

{
new Date(
c.dateOfBirth
).toLocaleDateString()
}

</td>




<td>

{c.address}

</td>



<td>

{c.phone}

</td>




<td>


<button

onClick={()=>editCitizen(c)}

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

onClick={()=>deleteCitizen(c.citizenID)}

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
editMode?
"Edit Citizen":
"Add Citizen"
}

</h2>





<input

className="border p-3 w-full mb-2"

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

className="border p-3 w-full mb-2"

placeholder="Gender"

value={form.gender}

onChange={(e)=>

setForm({
...form,
gender:e.target.value
})

}

/>






<input

type="date"

className="border p-3 w-full mb-2"

value={form.dateOfBirth}

onChange={(e)=>

setForm({
...form,
dateOfBirth:e.target.value
})

}

/>






<input

className="border p-3 w-full mb-2"

placeholder="Address"

value={form.address}

onChange={(e)=>

setForm({
...form,
address:e.target.value
})

}

/>






<input

className="border p-3 w-full mb-2"

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

onClick={saveCitizen}

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


export default Citizens;