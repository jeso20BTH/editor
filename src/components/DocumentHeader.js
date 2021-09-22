import React from 'react';

export default function DocumentHeader(props) {
    // console.log(props);
    return (
        <div className="documentHeader">
            <input
                type="text"
                value={props.title}
                onChange={props.headerChange}
                placeholder="Enter a name"
            />
        </div>
    );
}
