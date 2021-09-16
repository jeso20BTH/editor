import React from 'react';

export default function Button(props, index) {
    return (
        <div key={index} className="button" id={props.id} onClick={props.onClick}>
            <i className="material-icons-outlined">{props.icon}</i>
            <div className="button-text">
                <p>{props.name}</p>
            </div>
        </div>
    );
}
