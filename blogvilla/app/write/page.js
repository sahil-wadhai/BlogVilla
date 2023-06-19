"use client";
import BlogForm from "@/components/BlogForm";
import Login from "@/components/Login"
import { useState } from "react";

const write = () => {
  const [token,setToken] = useState(localStorage.getItem("token"));
  return (
    <>
    <div className="mt-4 h-screen w-2/3 mx-auto">
      {token? (<BlogForm token={token}/>) : (<Login setToken={setToken}/>) }
    </div>
    </>
  )
}

export default write
