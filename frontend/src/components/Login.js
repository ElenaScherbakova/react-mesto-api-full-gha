import React from "react";
import {useNavigate} from "react-router-dom";
import * as auth from "../auth";


function Login ({ onLogin, onFail }) {
    const [formValue, setFormValue] = React.useState({
            email: '',
            password: ''
        })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.authorize( formValue.email, formValue.password )
            .then((res) => {
              onLogin()
              navigate('/', {replace: true});
            })
            .catch(() => {
                onFail()
            });
    }


    return (
        <div className="register">
            <p className="register__welcome">
                Вход
            </p>
            <form onSubmit={handleSubmit} className="register__form" >
                <input id="email" className="register__data" name="email" placeholder={'Email'} type="email" value={formValue.email} onChange={handleChange} />
                <input className="register__data" id="password"  name="password" placeholder={'Пароль'} type="password" value={formValue.password} onChange={handleChange} />

                <div className="register__button-container">
                    <button type="submit" onSubmit={handleSubmit} className="register__link">Войти</button>
                </div>
            </form>

        </div>
    )
}

export default Login