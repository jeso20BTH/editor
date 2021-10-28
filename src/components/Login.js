import React from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';

export default function Login(props) {
    let host = window.location.host;
    let port = window.location.port
    console.log((host === 'localhost' && port) || host !== 'localhost');
    let email;
    if ((host === 'localhost' && port) || host !== 'localhost') {
        const search = useLocation().search;

        email = new URLSearchParams(search).get('email');
    }
    return (
        <div className='formdiv'>
            <form>
                <span>Login</span>
                <div className='formrow'>
                    <input
                        type='email'
                        placeholder='E-mail'
                        onChange={props.emailChange}
                        value={(email) ? email : (props.stateEmail) ? props.stateEmail : ''}
                    />
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
