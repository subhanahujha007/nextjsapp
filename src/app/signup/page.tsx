"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
interface User {
  email: string;
  password: string;
  username: string;
}

export default function SignupPage() {
  const router = useRouter();
const [buttondisabled,setbuttondisabled]=React.useState(false)
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
const [loading,setloading]=React.useState(false)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setloading(true)
    const response=  await axios.post('api/users/Signup',user)
  console.log("Signup succesfull",response.data)
  router.push("/login")  
  } catch (error:any) {
    toast.error(error.message)
    }finally{
      setloading(false)
    }
  };
useEffect(() => {
 if(user.email.length>0 && user.password.length>0 && user.username.length){
  setbuttondisabled(false)
 }
 else{
  setbuttondisabled(true)
 }
}, [user])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{loading?"proccessing":"Sign up here"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password</label>
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
        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
          {buttondisabled?"fill the form":"Sign up"}
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
