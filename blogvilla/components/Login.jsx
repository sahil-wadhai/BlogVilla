"use client";
import {useState,useEffect} from "react";
import axios from "axios";

const Login = ({setToken}) => {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const submitLogin = async ()=>{
    const data = {
      "username": username,
      "password": password
    }
    const config = {
      headers:{"Content-Type" : "application/x-www-form-urlencoded"}
    };

    try
    {
      const res = await axios.post("http://127.0.0.1:8000/login",data,config);
      const tokenData = res.data;
      sessionStorage.setItem("token",tokenData["access_token"])
      setToken(tokenData["access_token"]);
      console.log(tokenData["access_token"]);
    }
    catch(err)
    {
      console.log(err);
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    submitLogin();
  }

  return (
    <div className="w-2/3 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your email</label>
          <input type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required 
            value={username} onChange={ (e)=>{setUsername(e.target.value)} }
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required 
            value={password} onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
          </div>
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">remember me</label>
        </div> */}
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>
    </div>
  )
}

export default Login
