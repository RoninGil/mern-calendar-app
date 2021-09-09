import React from 'react';
import { useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginPage = () => {
    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange, reset] = useForm({
        loginEmail: 'carloss@hotmail.com',
        loginPassword: 'carlos'
    })
    const [formRegisterValues, handleRegisterInputChange, resetRegister] = useForm({
        name: 'Random Name',
        registerEmail: 'testing1234@hotmail.com',
        registerPassword1: 'jelouworld',
        registerPassword2: 'jelouworld'
    })

    const {loginEmail, loginPassword} = formLoginValues;
    const {name, registerEmail, registerPassword1, registerPassword2} = formRegisterValues;

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginEmail, loginPassword))
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault();

        if (registerPassword1 !== registerPassword2){
            return Swal.fire('Error', 'Contrasenas deben ser iguales', 'error')
        }
        dispatch(startRegister(name, registerEmail, registerPassword1));

    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name= "loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = {handleSubmitRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={name}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword1'
                                value={registerPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}