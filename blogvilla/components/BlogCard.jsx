"use client";
import Image from "next/image"
const BlogCard = ({blog}) => {
  return (
    
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-purple-900 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-l-lg" src="/images/notebook.jpg" alt=""/>
        <div className="flex flex-col justify-between p-4 leading-normal"> 
            <p className="text-xs text-gray-400 py-2">{blog.created_at}</p>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
            <p className="mb-3 text-sm text-gray-900 dark:text-gray-400">{blog.description}</p>
            <div className="flex p-3">
              <img alt="" className="h-10 w-10 rounded-full bg-gray-50 mr-2" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
              <div className="flex flex-col text-gray-200 text-sm">
                <p>{blog.author_name}</p>
                <p>{"dev"}</p>
              </div>
            </div>
        </div>
    </div>

  );
}

export default BlogCard
