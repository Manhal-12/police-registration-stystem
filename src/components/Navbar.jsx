import React from "react";
import { FaBars, FaBell } from "react-icons/fa";


const Navbar = () => {


return (

<div className="
bg-white/20
backdrop-blur-xl
rounded-2xl
p-5
flex
justify-between
items-center
shadow-xl
">


<div>


<h1 className="
text-white
text-2xl
font-bold
">

Police Registration System

</h1>


<p className="text-blue-200 text-sm">

Admin Dashboard

</p>


</div>





<div className="flex items-center gap-5 text-white">


<FaBell
size={22}
/>


<div className="
bg-blue-600
px-4
py-2
rounded-full
">

Admin

</div>


</div>



</div>

);


};


export default Navbar;