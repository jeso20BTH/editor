import React from 'react';
import Button from './Button';

export default function Toolbar(props) {
    return (
        <div className="toolbar">
            <div className="misc">
                {props.buttons.map(function(button, index) {
                    return Button(button, index);
                })}
            </div>
        </div>
    );
}
