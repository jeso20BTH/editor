import React from 'react';

export default function DocumentHeader(props) {
    return (
        <div className={(props.editorType === 'text') ? 'documentHeader' : 'documentHeader dark'}>
            <input
                type="text"
                value={props.title}
                onChange={props.headerChange}
                placeholder="Enter a name"
            />
        </div>
    );
}
