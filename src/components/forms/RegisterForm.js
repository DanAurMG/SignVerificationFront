import swal from 'sweetalert';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpass, setConfpass] = useState('');

    const navigate = useNavigate();

    function valPass(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*\-_\+\=\\\/]).{8,}$/;
        return regex.test(password);
    }
        
    function valEnoughPass(event) {
        const isValidPassword = valPass(password);
        
        const divPassword = document.querySelector(".div-password");
        
        if (!isValidPassword) {
            divPassword.innerHTML = `
            <p class="text-red-500">
                Su contraseña necesita una mayúscula, una carácter y una letra, así como un largo de 8 caracteres
            </p>
            `;
            return false;
        } else {
            divPassword.innerHTML = `
            <p class="text-[#0E8F00]">
                Contraseña válida
            </p>
            `;
            return true;
        }
    }

    function valSamePass(event) {
      
        const passVal = document.querySelector('.passVal');
      
        if (confpass === password) {
          passVal.innerHTML = `
            <p class="text-[#0E8F00]">
              Contraseñas idénticas :)
            </p>
          `;
          return true;
        } else {
          passVal.innerHTML = `
          <p class="text-red-500">
          Contraseñas no idénticas :(
            </p>
            `;
          return false;
        }
    }
      
    function registerVal(event) {
        event.preventDefault(); // Prevent default form submission behavior
        if (valEnoughPass(event)) {
            if(valSamePass(event)){
                if(!(username.length === 0)){   
                    if(!(email.length === 0)){
                        axios.post('http://127.0.0.1:5000/email', {
                            user: username,
                            email: email,
                            pass: password
                        })
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                swal('¡Correo enviado!', 'Revise su bandeja y verifique su registro', 'success');
                                navigate("/signIn");
                            }
                        })
                        .catch(function (error) {
                            console.log(error, 'error');
                            if (error.response.status === 401) {
                                swal('¡Oh no!', 'Email ya en uso', 'error');
                            } else if (error.response.status === 402) {
                                swal('¡Oh no!', 'Usuario ya rgistrado', 'error');
                            }
                        })
                    }else{
                        swal('¡Oh no!',' Se ha dejado la contraseña en blanco', 'error');
                    }
                }else{
                    swal('¡Oh no!',' Se ha dejado el usuario en blanco', 'error');
                }
            }
        }

        
        // if(username.length === 0){   
        //     swal('¡Oh no!',' Se ha dejado el usuario en blanco', 'error');
        // }else if(password.length === 0){
        //     swal('¡Oh no!',' Se ha dejado la contraseña en blanco', 'error');
        // }else if(valEnoughPass(event) && valSamePass(event)){
        //     console.log(username);
        //     console.log(password);
        //     console.log(email);
        //     axios.post('http://127.0.0.1:5000/email', {
        //         user: username,
        //         email: email, 
        //         pass: password
        //     })
        //     .then(function (response){
        //         console.log(response);
        //         if(response.status ===  200){
        //             swal('¡Correo enviado!','Revise su bandeja y verifique su registro', 'success');
        //             navigate("/signIn");
        //         }
        //     })
        //     .catch(function (error){
        //         console.log(error, 'error');
        //         if(error.response.status ===  401){
        //             swal('¡Oh no!','Email ya en uso', 'error');
        //         }else if(error.response.status ===  402){
        //             swal('¡Oh no!','Usuario ya rgistrado', 'error');
        //         }
        //     })
        // }
    }
    
    return(
        <div className="flex items-center justify-center mt-20 mb-10">
            <div className="flex flex-col w-[45%] bg-[#FACBAE] rounded-2xl justify-between items-center pt-4 pb-4 gap-8">
                <h2 className="text-3xl">Registro</h2>
                <form className="w-full flex flex-col justify-center items-center gap-8" onSubmit={registerVal}>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Nombre de usuario:</p>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Ingrese su nombre de usuario' name="userName"  className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2  "></input>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Correo electrónico:</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Ingrese su correo electrónico' name="userEmail" type="email" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2 "></input>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Contraseña:</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Ingrese su contraseña' name="userPass" type="password" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                        <div className="div-password"></div>
                    </div>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Confirmar contraseña:</p>
                        <input value={confpass} onChange={(e) => setConfpass(e.target.value)} placeholder='Confirme su contraseña' name="userVerPass" type="password" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                        <div className="passVal"></div>
                    </div>
                    <button type="submit" className="bg-[#EE5622] rounded-xl h-[50px] w-[120px] text-xl font-bold flex justify-center items-center">Registrar</button>
                </form>
            </div>
        </div>
    );
}