import Blog from '@/components/Blog'
//{parse(`${blog.content}`)}

async function get_blog(id){
  const res = await fetch(`http://127.0.0.1:8000/blogs/${id}`)
  const data = await res.json()
  return data
}

export default async function page({params}) {
  const blog = await get_blog(params.id)
  return ( 
    <>
      <Blog blog={blog}/>
    </>
  )
}







