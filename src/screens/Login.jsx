import NavBar from "../components/NavBar";
import Form from "../components/forms/LogInForm";
import { Link } from "react-router-dom";

export default function Login({setUser}){
    return(
        <>
            <NavBar/>
            <Form setUser = {setUser}/>         
            <div className="flex justify-center items-center flex-row gap-2 mb-10">
                <p className="text-lg text-[#F27845]">¿Aún no tienes una cuenta?</p>
                <Link to={"/"}><p className="text-lg text-[#B92C15]">Crear cuenta</p></Link>
            </div>
            <div className="flex justify-center items-center flex-row gap-2 mb-20">
                <p className="text-lg text-[#F27845]">¿Olvidaste tu contraseña?</p>
                <Link to={"/reset"}><p className="text-lg text-[#B92C15]">Recupérala aquí</p></Link>
            </div>
        </>
    )
}