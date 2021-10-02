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
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.documents.owner.map(function(document, index) {
                        return Document({
                            _id: document._id,
                            name: document.name,
                            date: document.date,
                            open: props.open,
                            deleteDocument: props.deleteDocument,
                            getAccessDocument: props.getAccessDocument,
                            type: 'owner'
                        }, index);
                    })}
                    {props.documents.access.map(function(document, index) {
                        return Document({
                            _id: document._id,
                            owner: document.owner,
                            name: document.name,
                            date: document.date,
                            open: props.open,
                            type: 'access'
                        }, index);
                    })}
                </tbody>
            </table>
        </div>
    );
}
