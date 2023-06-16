"use client";
import { useState , useEffect} from "react"
import axios from 'axios'
import BlogCard from './BlogCard'

export default function BlogSection() {

  const [blogList,setBlogList] = useState([{}]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/blogs')
    .then((res)=>{
      setBlogList(res.data)
    })
  },[])

  return (
    <div className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-purple-600 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-500">
            Learn how to grow your business with our expert advice.
          </p>
          <div className='block w-2/3 mx-1 py-2'>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-800 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogList.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}
