// import React,{useEffect,useState} from "react";


// const MyProfile =()=>{


// const [citizen,setCitizen]=useState(null);



// const user =
// JSON.parse(localStorage.getItem("user"));




// useEffect(()=>{


// fetch(
// `https://localhost:7001/api/Profile/${user.username}`
// )

// .then(res=>res.json())

// .then(data=>{

// setCitizen(data);

// });


// },[]);





// if(!citizen)
// {

// return (

// <h1 className="text-white p-10">

// Loading...

// </h1>

// )

// }




// return (

// <div className="
// min-h-screen
// bg-blue-950
// p-10
// text-white
// ">



// <h1 className="
// text-4xl
// font-bold
// ">

// Welcome {citizen.FullName}

// </h1>




// <div className="
// mt-8
// bg-white/20
// rounded-3xl
// p-8
// ">


// <p>
// ID : {citizen.CitizenID}
// </p>


// <p>
// Name : {citizen.FullName}
// </p>


// <p>
// Gender : {citizen.Gender}
// </p>


// <p>
// Birth : {citizen.DateOfBirth}
// </p>


// <p>
// Address : {citizen.Address}
// </p>


// <p>
// Phone : {citizen.Phone}
// </p>



// </div>



// </div>


// );


// };


// export default MyProfile;