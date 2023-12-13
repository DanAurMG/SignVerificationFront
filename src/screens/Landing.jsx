import { Link } from "react-router-dom";
import Form from "../components/forms/RegisterForm";
import NavBar from "../components/NavBar";

export default function Landing(){

    return(
        <>
            <NavBar/>
            <Form/>            
            <div className="flex justify-center items-center flex-row gap-2 mb-20">
                <p className="text-lg text-[#F27845]">¿Ya tienes una cuenta?</p>
                <Link to={"/signIn"}><p className="text-lg text-[#B92C15]">Inicia sesión</p></Link>
            </div>
        </>
    )
}