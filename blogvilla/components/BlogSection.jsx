"use client";
import { useState , useEffect} from "react"
import axios from 'axios'
const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  }
]

export default function BlogSection() {

  const [blogList,setBogList] = useState([{}]);

  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/blogs')
    .then((res)=>{
      setBogList(res.data)
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
            <article key={blog._id} className="flex max-w-xl flex-col items-start justify-between border border-purple-900 p-3 rounded-xl shadow-md shadow-purple-400">
              <div className="h-1/2 w-full">
                <img src="/images/notebook.jpg" alt="" className="h-full w-full rounded-xl bg-gray-50" />
              </div>
              <div className="flex items-center pt-2 gap-x-2 text-xs">
                <time dateTime={blog.created_at} className="text-gray-500">
                  {blog.created_at}
                </time>
                <a
                  href={"/"}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {"tech"}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href={"/"}>
                    <span className="absolute inset-0" />
                    {blog.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
              </div>
              <div className="relative mt-4 flex items-center gap-x-4">
                <img src={""} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6 flex flex-col justify-center">
                  <p className="font-semibold text-gray-900">
                    <a href={"/"}>
                      <span className="absolute inset-0" />
                      {blog.author_name}
                    </a>
                  </p>
                  <p className="text-gray-600">{"Developer"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
