import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../auth.js';


const Register = ({ onRegister, onFail }) => {
    const [formValue, setFormValue] = useState({
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
        auth.register( formValue.email, formValue.password )
            .then((res) => {
                onRegister()
                navigate('/signin', {replace: true}); // перенаправляем на страницу входа
            })
            .catch(() => {
                onFail()
            });

    }

    return (
        <div className="register">
            <p className="register__welcome">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="register__form" >
                <input id="email" className="register__data" name="email" placeholder={'Email'} type="email" value={formValue.email} onChange={handleChange} />
                <input className="register__data" id="password"  name="password" placeholder={'Пароль'} type="password" value={formValue.password} onChange={handleChange} />

                <div className="register__button-container">
                    <button type="submit" onSubmit={handleSubmit} className="register__link">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <Link to="login" className="register__login-link"> Уже зарегистрированы? Войти</Link>
            </div>
        </div>
    );
}

export default Register