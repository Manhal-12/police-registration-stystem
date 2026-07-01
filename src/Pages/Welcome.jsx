import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  FileText,
  UserCheck,
  Phone,
  MapPin,
  LockKeyhole,
} from "lucide-react";


function Welcome() {


const [citizens,setCitizens] = useState([]);
const [officers,setOfficers] = useState([]);
const [registrations,setRegistrations] = useState([]);



// GET DATABASE DATA

useEffect(()=>{


fetch("https://localhost:7001/api/Citizen")
.then(res=>res.json())
.then(data=>setCitizens(data));


fetch("https://localhost:7001/api/Officers")
.then(res=>res.json())
.then(data=>setOfficers(data));


fetch("https://localhost:7001/api/Registrations")
.then(res=>res.json())
.then(data=>setRegistrations(data));


},[]);





return (

<div className="min-h-screen bg-slate-950 text-white overflow-hidden">


<div
className="absolute inset-0 bg-cover bg-center opacity-40"

style={{
backgroundImage:
"url('https://images.unsplash.com/photo-1580136579312-94651dfd596d')"
}}

></div>



<div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-slate-950/90 to-slate-950"></div>




<div className="relative z-10">



{/* Navbar */}

<nav className="
w-[90%] md:w-[80%]
mx-auto
mt-6
bg-white/10
backdrop-blur-xl
border border-white/20
rounded-3xl
px-8
py-4
flex
justify-between
items-center
shadow-xl
">


<div className="flex items-center gap-3">

<div className="
bg-blue-600 
w-12 h-12 rounded-full
flex items-center justify-center">

<ShieldCheck size={28}/>

</div>


<h1 className="font-bold text-xl">
Police System
</h1>

</div>





<div className="hidden md:flex gap-8 text-gray-200">

<a href="#home"
className="hover:text-blue-400">
Home
</a>


<a href="#services"
className="hover:text-blue-400">
Services
</a>



<a href="#contact"
className="hover:text-blue-400">
Contact
</a>


</div>





<Link
to="/login"
className="
bg-blue-600
px-6
py-2
rounded-full
hover:bg-blue-700
">

Login

</Link>


</nav>







{/* HERO */}

<section
id="home"
className="
min-h-screen
flex
items-center
justify-center
px-6
pt-32
">


<div className="text-center max-w-4xl">


<div className="
inline-flex
bg-blue-600/20
border
border-blue-400/30
px-5 py-2
rounded-full
mb-6">


<LockKeyhole size={20}
className="mr-2"/>

Secure Police Registration

</div>




<h1 className="
text-5xl
md:text-7xl
font-extrabold">

Modern Police

<span className="text-blue-500">
 Registration System
</span>


</h1>



<p className="
mt-6
text-gray-300
text-lg">

Manage citizens, officers and registrations
with secure digital system.

</p>


</div>


</section>










{/* DATABASE CARDS */}



<section className="px-8 py-20">


<div className="
grid
md:grid-cols-3
gap-8
max-w-6xl
mx-auto">





<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8">


<Users size={40}
className="text-blue-400"/>


<h2 className="text-5xl font-bold mt-4">

{citizens.length}

</h2>


<p>
Registered Citizens
</p>


</div>







<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8">


<UserCheck size={40}
className="text-blue-400"/>


<h2 className="text-5xl font-bold mt-4">

{officers.length}

</h2>


<p>
Police Officers
</p>


</div>









<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8">


<FileText size={40}
className="text-blue-400"/>


<h2 className="text-5xl font-bold mt-4">

{registrations.length}

</h2>


<p>
Registrations
</p>


</div>





</div>


</section>









{/* RECENT TABLE */}



<section className="px-8 py-20">


<div className="
bg-white/10
backdrop-blur-xl
rounded-3xl
p-8
overflow-x-auto">


<h2 className="
text-3xl
font-bold
mb-6">

Recent Registrations

</h2>



<table className="w-full">



<thead>

<tr className="border-b">


<th className="p-3">
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


</tr>


</thead>




<tbody>


{

registrations.slice(0,5).map((r)=>(


<tr 
key={r.registrationID}
className="text-center border-b">


<td className="p-3">

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
new Date(r.registrationDate)
.toLocaleDateString()
}

</td>


</tr>


))


}



</tbody>


</table>



</div>



</section>







{/* CONTACT */}


<section id="contact"
className="px-8 py-20">


<div className="
grid
md:grid-cols-3
gap-8">


<div className="
bg-white/10
p-8
rounded-3xl">

<Phone/>

<h3>
Phone
</h3>

<p>
+252613762893
</p>

</div>




<div className="
bg-white/10
p-8
rounded-3xl">


<MapPin/>

<h3>
Location
</h3>

<p>
Police Department
</p>

</div>





<div className="
bg-white/10
p-8
rounded-3xl">


<FileText/>

<h3>
Support
</h3>

<p>
24/7
</p>


</div>



</div>



</section>





<footer className="
border-t
border-white/20
px-8
py-12
">


<div className="
max-w-6xl
mx-auto
grid
md:grid-cols-3
gap-10
">



{/* Logo */}

<div>

<div className="
flex
items-center
gap-3
mb-4">


<ShieldCheck
size={35}
className="text-blue-400"/>


<h2 className="text-2xl font-bold">
Police System
</h2>


</div>


<p className="text-gray-400">

Secure Police Registration System

</p>


</div>





{/* Quick Links */}

<div>


<h3 className="
text-xl
font-bold
mb-4">

Quick Links

</h3>



<div className="
flex
flex-col
gap-3
text-gray-300">


<a href="#home"
className="hover:text-blue-400">

Home

</a>


<a href="#services"
className="hover:text-blue-400">

Services

</a>



<a href="#about"
className="hover:text-blue-400">

About

</a>



<a href="#contact"
className="hover:text-blue-400">

Contact

</a>


</div>


</div>







{/* Contact */}

<div>


<h3 className="
text-xl
font-bold
mb-4">

Contact

</h3>


<p className="text-gray-300">

📞 +252613762893

</p>


<p className="text-gray-300 mt-2">

📍 Police Department

</p>


<p className="text-gray-300 mt-2">

Support 24/7

</p>


</div>





</div>





<div className="
text-center
border-t
border-white/20
mt-10
pt-6
text-gray-400">


© 2026 Police Registration System. All rights reserved.


</div>



</footer>




</div>


</div>


);


}


export default Welcome;