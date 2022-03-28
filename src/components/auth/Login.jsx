import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import {Helmet} from "react-helmet";

import './login.css'

import lock from './../../img/lock.svg'
import { login } from '../../helpers/login'
import { context } from '../../context/authContext'


export const Login = () => {

    const authContext = useContext(context)

    const [pass, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pass.trim() == "" ){
            Swal.fire({
                title: 'Ingresar contraseña',
                icon: 'warning'
            })
            return;
        }

        if(pass.includes(" ")){
            Swal.fire({
                title: 'No incluir espacios en blanco',
                icon: 'warning'
            })
            return;
        }

        login(pass)
            .then(() => {
                authContext.setLogged(true);
            })
    }

    const handleOnChange = (e) => {
        setPassword(e.target.value);
    }

    return(
        <div className='login'>
            <Helmet>
                <style>{'body { background-color: rgb(47, 47, 47);; }'}</style>
            </Helmet>
            <img src={lock} className="login_image"/>
            <h1 className='login__title'> El contenido se encuentra protegido. </h1>
            <h3 className='login__instruction'> Ingrese la contraseña </h3>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder='Contraseña' className='password' value={pass} onChange={handleOnChange}/>
            </form>
        </div>
    )
}
