import "./css/navbar.css";
import Link from 'next/link';
import { FaFacebookSquare,FaGithubSquare,FaYoutubeSquare,FaLinkedin} from 'react-icons/fa';
const Navbar = () => {
    
  return (
    <>  
        <header className="bg-gray-50">
            <nav className="nav">
                <div className="searchBox">
                    <input type="text" className="input-text"  placeholder="Search..."/>
                </div>
                <div className="brand">
                    <Link href={"/"} className="font-bold capitalize text-3xl">
                        BlogVilla
                    </Link>
                </div>
                <div className="w-96 order-3 flex justify-center">
                    <div className="flex gap-6">
                        <Link href={"/"} className="icon"><FaFacebookSquare /></Link>
                        <Link href={"/"} className="icon"><FaGithubSquare /></Link>                    
                        <Link href={"/"} className="icon"><FaLinkedin /></Link>
                    </div>
                </div>
            </nav>
        </header>
    </>
  );
};

export default Navbar;
