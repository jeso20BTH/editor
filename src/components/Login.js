import React from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';

export default function Login(props) {
    const search = useLocation().search;

    const email = new URLSearchParams(search).get('email');

    props.setQueryEmail(email);

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
                <Link to='/'>
                    <input className='btn' type='submit' value='Login' onClick={props.login}/>
                </Link>
            </form>
            <Link to='/register'>Not an user? register here</Link>
        </div>
    );
}
