'use client'
import axios from "axios";
import { useState,useEffect } from "react";
import parse from 'html-react-parser';

// import { useRouter } from 'next/navigation'

const pg = ({params}) =>
{
  // const router = useRouter()
  const [blog,setBlog] = useState({});
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/blogs/${params.id}`)
    .then((res)=>{
      setBlog(res.data)
    })
  },[])
  return ( 
    <>
      <p>hi</p>
      {parse(`${blog.content}`)}
    </>
  )
}

// export async function getServerSideProps(context)
// {
//   console.log(context);
//   const res = await axios.get('http://127.0.0.1:8000/blogs/64868d7f7561b696aae57c36')
//   postData = await res.data
//   return {
//     props:{postData}
//   }
// }

export default pg


