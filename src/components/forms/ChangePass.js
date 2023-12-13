import swal from 'sweetalert';
import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPass({user,email}){
    
    const [passWord, setpassWord] = useState('');
    const [passWordConf, setpassWordConf] = useState('');

    const navigate = useNavigate();

    function valPass(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*\-_\+\=\\\/]).{8,}$/;
        return regex.test(password);
    }
    
    function valEnoughPass(event) {
        const isValidPassword = valPass(passWord);
        
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
    
        if (passWordConf === passWord) {
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
        const nombreUsuario = user[0];
        const correoUsuario = email[0];
        console.log(nombreUsuario);
        console.log(correoUsuario);
        event.preventDefault(); // Prevent default form submission behavior
        if(passWord.length === 0){   
            swal('¡Oh no!',' No puede solicitar un enlace sin ingresar su correo', 'error');
        }else if(passWordConf.length === 0){   
                swal('¡Oh no!',' Se ha dejado el usuario en blanco', 'error');
        }else{
            if (valEnoughPass(event)) {
                if(valSamePass(event)){
                    
                    axios.post('http://127.0.0.1:5000/changePass', {
                        email: correoUsuario,
                        user: nombreUsuario,
                        pass: passWord
                    })
                    .then(function (response){
                        console.log(response);
                        if(response.status ===  200){
                            swal('Contraseña cambiada','Se ha cambiado la contraseña exitosamente', 'success');
                            navigate("/signIn");
                        }
                    })
                    .catch(function (error){
                        console.log(error, 'error');
                        if(error.response.status ===  409){
                            swal('¡Oh no!','Ha ocurrido un error desconocido para el programador', 'error');
                        }
                    })
                }
            }
        }
    }

    return(
        <div className="flex items-center justify-center mt-20 mb-10">
            <div className="flex flex-col w-[45%] bg-[#FACBAE] rounded-2xl justify-between items-center pt-4 pb-4 gap-8">
                <h2 className="text-3xl">Reestablecimiento de contraseña</h2>
                <p>Correo: {email}</p>
                <p>Usuario: {user}</p>
                <form className="w-full flex flex-col justify-center items-center gap-8" onSubmit={registerVal}>
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Nueva contraseña:</p>
                        <input value={passWord} onChange={(e) => setpassWord(e.target.value)} placeholder='Ingrese su nueva contraseña' name="email" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                        <div className="div-password"></div>
                    </div>                  
                    <div className="w-[90%] flex flex-col">
                        <p className="font-medium">Confirme nueva contraseña:</p>
                        <input value={passWordConf} onChange={(e) => setpassWordConf(e.target.value)} placeholder='Confirme su contraseña' name="userName" className="bg-[#FEF5EE] border-[#B92C15] border-2 h-[50px] rounded-xl pl-2"></input>
                        <div className="passVal"></div>
                    </div>                 
                    <button type="submit" className="bg-[#EE5622] font-semibold rounded-xl h-[50px] w-fit px-5 text-xl flex justify-center items-center">Reestablecer</button>
                </form>
            </div>
        </div>
    );
}