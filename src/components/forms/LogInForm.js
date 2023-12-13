import swal from 'sweetalert';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogInForm({setUser}){

    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

    function registerVal(event) {
        event.preventDefault(); // Prevent default form submission behavior
        if(username.length === 0){   
            swal('¡Oh no!',' Se ha dejado el usuario en blanco', 'error');
        }else if(password.length === 0){
            swal('¡Oh no!',' Se ha dejado la contraseña en blanco', 'error');
            
        }else{
            axios.post('http://127.0.0.1:5000/login', {
                user: username,
                pass: password
            })
            .then(function (response){
                console.log(response);
                if(response.status ===  200){
                    swal('¡Excelente!','Acceso al sistema permitido', 'success');
                    setUser([username]);
                    // navigate("/authorized");
                }
            })
            .catch(function (error){
                console.log(error, 'error');
                if(error.response.status ===  409){
                    swal('¡Oh no!','Contraseña erronea', 'error');
                }else if(error.response.status ===  401){
                    swal('¡Oh no!','Usuario inválido', 'error');
                }
            })
        }
    }

    return(
        <div className="flex items-center justify-center mt-20 mb-10">
            <div className="flex flex-col w-[45%] bg-[#FACBAE] rounded-2xl justify-between items-center pt-4 pb-4 gap-8">
                <h2 className="text-3xl">Iniciar sesión</h2>
                <form className="w-full flex flex-col justify-center items-center gap-8" onSubmit={registerVal}>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Nombre de usuario:</p>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su nombre de usuario' name="userName" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Contraseña:</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Introduzca su contraseña' name="userPass" type="password" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2" ></input>
                    </div>                    
                    <button type="submit" className="bg-[#EE5622] font-semibold rounded-xl h-[50px] w-[120px] text-xl flex justify-center items-center">Ingresar</button>
                </form>
            </div>
        </div>
    );
}