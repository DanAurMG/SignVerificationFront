import Form from "../components/forms/ChangePass";
import NavBar from "../components/NavBar";

export default function ResetingPass({user, email}){
    return(
        <>
            <NavBar/>
            <Form user = {user} email={email}/>
        </>
    )
}