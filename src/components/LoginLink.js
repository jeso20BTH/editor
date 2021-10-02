import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function LoginLink(props) {
    return (
        <Link
            className="link"
            to={`${props.siteUrl}/login`}
        >
            <button className='nav-button'>
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
