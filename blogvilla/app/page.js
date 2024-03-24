import Header from "@/components/Header"
import BlogSection from "@/components/BlogSection"

async function get_blogList(){
  const res = await fetch(`http://127.0.0.1:8000/blogs`);
  const data = res.json()
  return data
}

export default async function Home() {
  const blogList = await get_blogList()
  return (
    <>    
      <Header/>
      <BlogSection blogList={blogList}/>
    </>
  )
}
