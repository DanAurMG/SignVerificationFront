import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Form from "../components/forms/ResetPass";

export default function ResetPass({setEmailRec, setUser}){
    return(
        <>
            <NavBar/>
            <Form setEmailRec = {setEmailRec} setUser = {setUser}/>
            <div className="flex justify-center items-center flex-row gap-2 mb-20">
                <p className="text-lg text-[#F27845]">¿Recordaste tu contraseña?</p>
                <Link to={"/signIn"}><p className="text-lg text-[#B92C15]">Inicia sesión</p></Link>
            </div>
        </>
    )
}