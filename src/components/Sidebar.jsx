import React from "react";
import { Link } from "react-router-dom";

import {
FaHome,
FaUsers,
FaUserShield,
FaClipboardList,
FaChartBar,
FaSignOutAlt
} from "react-icons/fa";



const Sidebar = () => {


return (


<div className="
w-72
min-h-screen
bg-white/20
backdrop-blur-xl
p-6
hidden
md:block
">





<div className="text-center mb-10">



<img

src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

className="
w-20
mx-auto
rounded-full
border-4
border-white
"

/>




<h1 className="
text-white
text-xl
font-bold
mt-3
">

Police System

</h1>



</div>







<div className="space-y-6">



<Link

to="/dashboard"

className="
flex
gap-3
items-center
text-white
hover:text-blue-300
duration-300
"

>

<FaHome/>

Dashboard

</Link>






<Link

to="/citizens"

className="
flex
gap-3
items-center
text-white
hover:text-blue-300
"

>

<FaUsers/>

Citizens

</Link>






<Link

to="/officers"

className="
flex
gap-3
items-center
text-white
hover:text-blue-300
"

>

<FaUserShield/>

Officers

</Link>







<Link

to="/registrations"

className="
flex
gap-3
items-center
text-white
hover:text-blue-300
"

>

<FaClipboardList/>

Registrations

</Link>






<Link

to="/reports"

className="
flex
gap-3
items-center
text-white
hover:text-blue-300
"

>

<FaChartBar/>

Reports

</Link>







<Link

to="/login"

className="
flex
gap-3
items-center
text-white
hover:text-red-400
"

>


<FaSignOutAlt/>

Logout


</Link>






</div>




</div>


);


};



export default Sidebar;