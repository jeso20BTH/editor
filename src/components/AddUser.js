import React from 'react';

export default function AddUser(props) {
    return (
        <>
            <input
                className='user-input'
                type='email'
                placeholder='Enter email to give access'
                onChange={props.accessChange}
            />
            <button className="button" onClick={props.addAccess}>
                <i className='material-icons-outlined'>done</i>
            </button>
            <button className="button" onClick={props.regretAccess}>
                <i className='material-icons-outlined'>clear</i>
            </button>
        </>
    );
}
