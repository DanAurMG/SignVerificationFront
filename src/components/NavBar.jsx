import { Link } from "react-router-dom";

export default function NavBar(){
    return(
        <div className="flex justify-center items-center h-[90px] bg-[#F27845]">
            <div className="flex flex-row justify-between w-[80%]">
            <Link to="/">
                <div className="bg-[#FACBAE] hover:bg-[#ffb07e] border-[#B92C15] rounded-full border-4 h-[60px] w-[110px] flex justify-center items-center">
                    <p className="font-semibold text-xl">LOGO</p>
                </div>
            </Link>
                <div className="bg-[#FACBAE] hover:bg-[#ffb07e] border-[#B92C15] rounded-full border-4 h-[60px] w-[140px] flex justify-center items-center">
                    <p className="font-semibold text-xl">AUTORES</p>
                </div>
            </div>
        </div>
    )
}