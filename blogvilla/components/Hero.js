import Link from 'next/link';
import Image from "next/image";
// import './css/hero.css'
const Hero = () => {

    const bg = {
        background: "url('https://github.com/akashyap2013/nextjs_blog_app/blob/22_Finishing/public/images/banner.png') no-repeat",
        backgroundPosition: "center"
    }
    
    return (
        <> 
            <section className="py-10"  style={bg}>
                <div className="container mx-auto md:px-20">
                    <h1 className="font-bold text-4xl pb-12 text-center">Design</h1>
                    <Slide></Slide>
                </div>
            </section>
        </>
    );
};

function Slide() {
    
    return(
        <div className="grid md:grid-cols-2 gap-4">
            <div className="image">
                <Link href={`/posts/1`}><Image src={"/images/notebook.jpg"} width={600} height={300} /></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={`/posts/1`} className="text-orange-600 hover:text-orange-800">{"Tech,life,business,love"}</Link>
                    <Link href={`/posts/1`} className="text-gray-800 hover:text-gray-600">  - {"03/06/2023"}</Link>
                </div>
                <div className="title">
                    <Link href={`/posts/1`} className="py-3 text-3xl md:text-6xl font-bold text-gray-500 hover:text-gray-600">
                        {"Learn and Grow"}
                    </Link>
                </div>
                <p className="text-gray-500 py-3">
                    {"Sharing is Caring"}
                </p>
                <></>
            </div>
        </div>
    );
}

export default Hero;
