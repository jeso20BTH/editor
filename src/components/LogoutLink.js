import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function LogoutLink(props) {
    return (
        <>
            <div className='center-column'>
                <i className="material-icons-outlined">
                    account_circle
                </i>
            </div>
            <div className='center-column'>
                <p className='user'>{props.user.charAt(0).toUpperCase() + props.user.slice(1)}</p>
            </div>


            <Link to='/logout' className='link'>
                <button className='nav-button'>
                    <div className='center-column'>
                        <p>Logout</p>
                    </div>
                </button>
            </Link>
        </>


    );
}
