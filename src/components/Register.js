import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function Register(props) {
    return (
        <div className='formdiv'>
            <form>
                <span>Register</span>
                <div className='formrow'>
                    <input type='text' placeholder='Name' onChange={props.nameChange}/>
                </div>
                <div className='formrow'>
                    <input type='email' placeholder='E-mail' onChange={props.emailChange}/>
                </div>
                <div className='formrow'>
                    <input type='password' placeholder='Password' onChange={props.passwordChange}/>
                </div>
                <Link to={`${props.siteUrl}/`}>
                    <input
                        className='btn'
                        type='submit'
                        value='Register'
                        onClick={props.register}
                    />
                </Link>
            </form>
            <Link to={`${props.siteUrl}/login`}>Already registered? login here</Link>
        </div>
    );
}
