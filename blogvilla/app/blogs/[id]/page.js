'use client';
import axios from "axios";
import { useState,useEffect } from "react";

import Blog from '@/components/Blog'
//{parse(`${blog.content}`)}
const pg = ({params}) =>
{

  const [blog,setBlog] = useState({});
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/blogs/${params.id}`)
    .then((res)=>{
      setBlog(res.data)
    })
  },[])

  return ( 
    <>
      <Blog blog={blog}/>
    </>
  )
}

export default pg


