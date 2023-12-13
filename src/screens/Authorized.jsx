import axios from "axios";
import NavBar from "../components/NavBar";
import swal from 'sweetalert';
import React, { useState } from 'react';

export default function Authorized({ user, setUser }) {

    const logout = () => {
        setUser([])
    }

    const [documento, setDocumento] = useState(null);
    const [llavePrivada, setLlavePrivada] = useState(null);
    const [llavePublica, setLlavePublica] = useState(null);
    const [firma, setFirma] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleDocumentoChange = (event) => {
        setDocumento(event.target.files[0]);
    };

    const handleLlavePrivadaChange = (event) => {
        setLlavePrivada(event.target.files[0]);
    };

    const handleLlavePublicaChange = (event) => {
        setLlavePublica(event.target.files[0]);
    };

    const handleFirmar = async () => {
        try {
            const formData = new FormData();
            formData.append('documento', documento);
            formData.append('llave_privada', llavePrivada);
            // const usuario = user[0];

            const response = await fetch('http://127.0.0.1:5000/firmar', {
                method: 'POST',
                body: formData,
                // nombre: usuario
            });

            const data = await response.json();
            setMensaje(data.mensaje);
            setError('');
        } catch (err) {
            setMensaje('');
            setError('Error al firmar el documento.');
        }
    };

    const handleVerificar = async () => {
        try {
            const formData = new FormData();
            formData.append('documento', documento);
            // formData.append('firma', firma);
            formData.append('llave_publica', llavePublica);

            const response = await fetch('http://127.0.0.1:5000/verificar', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setMensaje(data.mensaje);
            setError('');
        } catch (err) {
            setMensaje('');
            setError('Error al verificar la firma.');
        }
    };

    return(
        <>
            <NavBar/>
            
            <div className="flex flex-row justify-around items-center">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-10 font-bold text-5xl">Bienvenid@, {user}</h1>
                    <div className="bg-[#FACBAE] h-fit flex flex-col py-10 px-20 w-fit mt-20 rounded-[20px] gap-5">
                        <h1 className="font-bold text-5xl">Etapa ll</h1>
                        <h1 className="font-bold text-xl">Presiona sobre el archivo que quiera firmar</h1>
                        <ul className="pl-6 gap-3 flex flex-col">
                            <li className="text-xl ">Criptografía Clásica</li>
                            <li className="text-xl ">Criptografía Moderna</li>
                            <li className="text-xl ">Tendencia Criptográfica</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <h2>Firmar Documento</h2>
                        <input type="file" accept=".txt" onChange={handleDocumentoChange} />
                        <br />
                        <input type="file" accept=".pem" onChange={handleLlavePrivadaChange} />
                        <br />
                        <button onClick={handleFirmar} className="bg-[#EE5622] mt-10 rounded-[20px] px-[20px] py-[10px] text-xl font-bold">
                            Firmar documento
                        </button>
                    </div>
                    <div>
                        <h2>Verificar Documento</h2>
                        <input type="file" accept=".txt" onChange={handleDocumentoChange} />
                        <br />
                        <input type="file" accept=".pem" onChange={handleLlavePublicaChange} />
                        <br />
                        <button onClick={handleVerificar} className="bg-[#EE5622] mt-10 rounded-[20px] px-[20px] py-[10px] text-xl font-bold">
                            Verificar documento firmado
                        </button>
                    </div>
                    {mensaje && <p>{mensaje}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button onClick={logout} className="bg-[#EE5622] mt-10 rounded-[20px] px-[20px] py-[10px] mb-20 text-xl font-bold">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    );
}