import React from 'react';

export default function CodeRow(props, index) {
    return (
        <p key={index}>- {props.codeRow}</p>
    );
}
