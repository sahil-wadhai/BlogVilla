import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Card from "@/components/Card"
export default function Home() {
  
  return (
    <>
    
      <Navbar/>
      <Header/>
      
      

      <div className="p-2 my-2 grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
      <Card/>
      <Card/>
      <Card/>
      </div>
    </>
  )
}
