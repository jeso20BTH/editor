import React from 'react';

export default function Document(props, index) {
    // console.log(props);
    return (
        <tr id={props._id} onClick={props.open} key={index} className="document">
            <td>{props.name}</td>
            <td >{props.date}</td>
        </tr>
    );
}
