"use client"
import axios from "axios";
import { link } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
    const router=useRouter()
    const [data,setdata]=React.useState("nothing")
    const logout=async()=>{
try {
     await axios.get("/api/users/logout")
     toast.success("logged out succesfully")   
     router.push("/login")                                                                            
} catch (err:any) {
    toast.error(err)
}
    }
    const getuserdata=async()=>{
try {
    const response=await axios.get("api/users/me")
    console.log(response)
    setdata(response.data.data._id)
} catch (error:any) {
    console.error(error)
    toast.error(error)
}
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white font-bold">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                <h1 className="text-3xl mb-4">Welcome to Your Profile Page</h1>
                <h2>{data==='nothing'?"click on the getuserdata button":<Link className="m-4 bg-green-500 hover:bg-blue-600 text-white font-bold  px-4 rounded" href={`/profile/${data}`}>{data}</Link>}</h2>
                <hr className="border-gray-600 mb-4" />
                <button onClick={logout} className="m-4 bg-pink-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Logout
                </button>
                <button onClick={getuserdata} className="m-4 bg-orange-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    getuserdata
                </button>
            </div>
        </div>
    );
}
