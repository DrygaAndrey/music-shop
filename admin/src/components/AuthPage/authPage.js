
import React, { useState } from 'react';

import { INPUT_TYPES } from '../input/input';
import Input from '../input/input';
import Form from '../form/form';
import { toast } from 'react-toastify';
import {myStore} from '../../store/store';

import 'react-toastify/dist/ReactToastify.css';
import './authPage.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export default function AuthPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const setLoading = myStore(state => state.setLoading);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!(login.length >= 3 && login.length <= 100 && /^[a-zA-Z0-9]+$/.test(login) && password.length >= 3 && password.length <= 100 && /^[a-zA-Z0-9]+$/.test(password))) {
            toast.warn('Your login or password is not correct');
            return;
        }
        fetchData();
    };

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
                credentials: 'include',
            });
            const data=await response.json();
            if (!data.ok) {
                toast.warn(data.message);
                
                return;
            } 
            console.log('Successfully logged in');
            window.location.href = '/';
        } catch (error) {
            toast.error('An error occurred while logging in.');
        } finally {
            setLoading(false);
        }
    }

    function onInputChange(e) {
        const { name, value } = e.target;
        if (name === 'login') {
            setLogin(value.replace(/[^a-zA-Z0-9]/g, ''));
        } else if (name === 'password') {
            setPassword(value.replace(/[^a-zA-Z0-9]/g, ''));
        }
    };

    return (
        <div className="authForm">
            <Form handleSubmit={handleSubmit}>
                <Input type={INPUT_TYPES.TEXT} placeholder={'Your login'} name="login" value={login} onChangeHandler={onInputChange} />
                <Input type={INPUT_TYPES.PASSWORD} placeholder={'Your password'} name="password" value={password} onChangeHandler={onInputChange} />
                <Input type={INPUT_TYPES.SUBMIT} value="Login" />
            </Form>
        </div>
    );
}

