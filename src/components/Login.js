import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function Login(props) {
    return (
        <div className='formdiv'>
            <form>
                <span>Login</span>
                <div className='formrow'>
                    <input type='email' placeholder='E-mail' onChange={props.emailChange}/>
                </div>
                <div className='formrow'>
                    <input type='password' placeholder='Password' onChange={props.passwordChange}/>
                </div>
                <Link to={`${props.siteUrl}/`}>
                    <input className='btn' type='submit' value='Login' onClick={props.login}/>
                </Link>
            </form>
            <Link to={`${props.siteUrl}/register`}>Not an user? register here</Link>
        </div>
    );
}
