"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  password: string;
  username: string;
}

export default function Loginpage() {
  
  const [buttondisabled,setbuttondisabled]=React.useState(false)
  const [loading,setloading]=React.useState(false)
  const router = useRouter();


  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: ""
  });
  useEffect(() => {
    if(user.email.length>0 && user.password.length>0 && user.username.length){
      setbuttondisabled(false)
     }
     else{
      setbuttondisabled(true)
     }

  
  }, [user])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setloading(true)  
      await axios.post('/api/users/login',user)
      toast.success("login succesfull")
      router.push("/profile")
    } catch (error:any) {
      toast.error(error)
    }
    finally{
      setloading(false)
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{loading?"processing":"log up here"}</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-6">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
       
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
           Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link href="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
