import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function LoginLink() {
    return (
        <Link
            className="link"
            to='/login'
        >
            <button className='nav-button' id='login-link-btn'>
                <div className='center-column'>
                    <i className="material-icons-outlined">lock</i>
                </div>
                <div className='center-column'>
                    <p>Login</p>
                </div>
            </button>


        </Link>
    );
}
