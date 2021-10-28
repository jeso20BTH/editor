import React from 'react';

export default function Document(props, index) {
    return (
        <tr id={props._id} key={index} className="document">
            <td onClick={props.open}>{props.name}</td>
            <td >{props.date}</td>
            <td>{props.type}</td>
            {(props.userType === 'owner') ?
                <>
                    <td>
                        <i onClick={props.deleteDocument} className='material-icons-outlined'>
                            clear
                        </i>
                    </td>
                </> :
                <>
                    <td></td>
                </>
            }
        </tr>
    );
}
