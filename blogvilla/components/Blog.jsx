'use client';
import parse from 'html-react-parser';
const Blog = ({blog}) => {
  return (
    <>
      <div className='w-5/6 mx-auto py-8 min-h-screen'>

        <div className="flex py-5">
          <img alt="" className="h-20 w-20 rounded-full bg-gray-50 mr-2" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
          <div className="flex flex-col">
            <p className="flex flex-col text-gray-900 text-lg font-extrabold">{blog.author_name}</p>
            <p className="flex flex-col text-gray-700 text-lg">{"dev"}</p>
            <p className="text-xs text-gray-600">{blog.created_at}</p>
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-purple-900 lg:mb-6 lg:text-4xl">{blog.title}</h1>
        <p className="mb-4 text-lg font-bold leading-tight text-gray-700 lg:mb-6 lg:text-xl">{blog.description}</p>
        <img className='my-4' src="" alt="thumbnail" />
        <div>
          {parse(`${blog.content}`)}
        </div>
        
      </div>
    </>
  )
}

export default Blog
