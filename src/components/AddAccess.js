import React from 'react';
import {
    Link
} from 'react-router-dom';

export default function AddAccess(props) {
    return (
        <div className='formdiv'>
            <form>
                <span>Add access</span>
                <div className='formrow'>
                    <input type='email' placeholder='email' onChange={props.accessChange}/>
                </div>
                <Link to='/'>
                    <input className='btn' type='submit' value='Submit' onClick={props.addAccess}/>
                </Link>
            </form>
        </div>
    );
}
