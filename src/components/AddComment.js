import React from 'react';

export default function AddComment(props) {
    return (
        <>
            <input
                className='user-input'
                type='text'
                placeholder='Add an comment to selected line.'
                onChange={props.commentChange}
            />
            <button className="button" onClick={props.addComment}>
                <i className='material-icons-outlined'>done</i>
            </button>
            <button className="button" onClick={props.regretComment}>
                <i className='material-icons-outlined'>clear</i>
            </button>
        </>
    );
}
