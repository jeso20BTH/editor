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
                    {props.documents.owner.map(function(doc, index) {
                        return Document({
                            _id: doc._id,
                            name: doc.name,
                            date: doc.date,
                            open: props.open,
                            deleteDocument: props.deleteDocument,
                            getAccessDocument: props.getAccessDocument,
                            type: 'owner'
                        }, index);
                    })}
                    {props.documents.access.map(function(user) {
                        return user.documents.map(function(doc, index) {
                            return Document({
                                _id: doc._id,
                                owner: user._id,
                                name: doc.name,
                                date: doc.date,
                                open: props.open,
                                type: 'access'
                            }, index);
                        });
                    })}
                </tbody>
            </table>
        </div>
    );
}
