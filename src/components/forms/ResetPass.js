import swal from 'sweetalert';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPass({setEmailRec, setUser}){
    
  const [email, setemail] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

    function registerVal(event) {
        event.preventDefault(); // Prevent default form submission behavior
        if(email.length === 0){   
            swal('¡Oh no!',' No puede solicitar un enlace sin ingresar su correo', 'error');
        }else if(username.length === 0){   
                swal('¡Oh no!',' Se ha dejado el usuario en blanco', 'error');
        }else{
            axios.post('http://127.0.0.1:5000/resetLink', {
                email: email,
                user: username,
            })
            .then(function (response){
                console.log(response);
                if(response.status ===  200){
                    swal('Usuario encontrado','Por favor, cambie su contraseña', 'success');
                    setEmailRec([email]);
                    setUser([username]);
                    navigate("/reset/authorized");
                }
            })
            .catch(function (error){
                console.log(error, 'error');
                if(error.response.status ===  409){
                    swal('¡Oh no!','Su usuario no estáregistrado en el sistema', 'error');
                }else if(error.response.status ===  401){
                    swal('¡Oh no!','Usuario inválido', 'error');
                }
            })
        }
    }

    return(
        <div className="flex items-center justify-center mt-20 mb-10">
            <div className="flex flex-col w-[45%] bg-[#FACBAE] rounded-2xl justify-between items-center pt-4 pb-4 gap-8">
                <h2 className="text-3xl">Recuperación de contraseña</h2>
                <form className="w-full flex flex-col justify-center items-center gap-8" onSubmit={registerVal}>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Correo electrónico:</p>
                        <input value={email} onChange={(e) => setemail(e.target.value)} placeholder='Ingrese su correo electrónico' name="email" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                    </div>                  
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Nombre de usuario:</p>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su nombre de usuario' name="userName" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                    </div>                 
                    <button type="submit" className="bg-[#EE5622] font-semibold rounded-xl h-[50px] w-fit px-5 text-xl flex justify-center items-center">Solicitar reestablecimiento</button>
                </form>
            </div>
        </div>
    );
}