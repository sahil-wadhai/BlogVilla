"use client";
import {useState,useRef,useMemo} from "react";
import axios from "axios";
import JoditEditor from 'jodit-react';

const BlogForm = ({ token }) => {

  const editor = useRef(null);
  const joditConfig =
		{
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: 'Start typings...'
		}


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const submitLogin = async () => {
    const data = {
      "title": title,
      "description": description,
      "content": content,
    }
    const config = {
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type": "application/json" 
      }
    };

    try {
      const res = await axios.post("http://127.0.0.1:8000/blogs/create", data, config);
      console.log(res);
    }
    catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  }
  return (
    <>
      <form className='p-5 md:pt-7 md:px-14 flex flex-col gap-10 mb-5' onSubmit={handleSubmit}>
        <div >
          <label htmlFor="title" className="block text-base font-medium leading-6 text-gray-900">Title</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">#</span>
            </div> */}
            <input type="text" name="title" id="title" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Topic of the blog" 
              value={title}
              onChange={ (e)=>{setTitle(e.target.value)} }
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-base font-medium leading-6 text-gray-900">Description</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">#</span>
            </div> */}
            <input type="text" name="description" id="description" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Description of the blog" 
             value={description}
             onChange={ (e)=>{setDescription(e.target.value)} }
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-base font-medium leading-6 text-gray-900">Content</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">#</span>
            </div> */}
            <JoditEditor
              ref={editor}
              value={content}
              config={joditConfig}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => { }}
              className="block h-full w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {/* <textarea name="content" id="content" cols="30" rows="10"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Content of the blog"
              value={content}
              onChange={ (e)=>{setContent(e.target.value)} }
            ></textarea> */}
          </div>
        </div>
        <div>
          <button className='bg-purple-700 px-3 py-1 rounded-lg text-white' type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default BlogForm
