import React from 'react';
import Document from './Document';

export default function OpenMenu(props) {
    return (
        <div className={props.status} >
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    {props.documents.map(function(document, index) {
                        return Document({
                            _id: document._id,
                            name: document.name,
                            date: document.date,
                            open: props.open
                        }, index);
                    })}
                </tbody>
            </table>
        </div>
    );
}
