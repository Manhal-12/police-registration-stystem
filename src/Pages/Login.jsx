import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaLock} from "react-icons/fa";


const Login =()=>{


const navigate = useNavigate();


const [role,setRole] = useState("User");

const [username,setUsername] = useState("");

const [password,setPassword] = useState("");

const [error,setError] = useState("");





const handleLogin = async(e)=>{


e.preventDefault();


setError("");



try{


const response = await fetch(
"https://localhost:7001/api/Users"
);



const users = await response.json();





const user = users.find(
(u)=>

u.username === username &&
u.password === password &&
u.role.toLowerCase() === role.toLowerCase()

);






if(user)
{

localStorage.setItem(
"user",
JSON.stringify(user)
);


navigate("/dashboard");


}

else
{

setError(
"Username or password is incorrect"
);

}



}

catch(err)
{

setError(
"Server connection failed"
);

}



};







const bg =
"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80";




return (

<div

className="
min-h-screen
bg-cover
bg-center
flex
items-center
justify-center
"

style={{
backgroundImage:`url(${bg})`
}}

>


<div className="
min-h-screen
w-full
bg-blue-950/80
flex
items-center
justify-center
">






<div className="
w-105
bg-white/20
backdrop-blur-xl
rounded-3xl
shadow-2xl
p-10
">






<h1 className="
text-white
text-3xl
font-bold
text-center
">

Police System

</h1>




<p className="
text-center
text-blue-200
mt-2
">

Login to continue

</p>







<form
onSubmit={handleLogin}
className="
mt-8
space-y-5
">







<div>

<label className="text-white">
Username
</label>


<input

className="
w-full
mt-2
p-3
rounded-xl
"

placeholder="Enter username"


onChange={
(e)=>setUsername(e.target.value)
}


/>


</div>








<div>


<label className="text-white">
Password
</label>


<input

type="password"

className="
w-full
mt-2
p-3
rounded-xl
"


placeholder="Enter password"



onChange={
(e)=>setPassword(e.target.value)
}



/>


</div>







<div>


<label className="text-white">
Login As
</label>



<select

value={role}

onChange={
(e)=>setRole(e.target.value)
}

className="
w-full
mt-2
p-3
rounded-xl
">


<option>
User
</option>


<option>
Admin
</option>


</select>



</div>







{
error &&

<p className="
text-red-300
text-center
">

{error}

</p>

}









<button

className="
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-3
rounded-xl
font-bold
"


>


<FaLock className="inline mr-2"/>

Login


</button>






</form>







</div>





</div>



</div>


);



};


export default Login;