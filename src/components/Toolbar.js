import React from 'react';
import Button from './Button';
import AddUser from './AddUser';

export default function Toolbar(props) {
    return (
        <div className="toolbar">
            <div className="misc">
                {props.buttons.misc.map(function(button, index) {
                    return Button(button, index);
                })}
            </div>
            {(!props.owner && props.documentId && !props.addAccessStatus) ?
                <div className='misc'>
                    < Button
                        id={props.buttons.access.id}
                        name={props.buttons.access.name}
                        icon={props.buttons.access.icon}
                        onClick={props.buttons.access.onClick}
                        index={1337}
                    />
                </div> :
                <></>
            }
            {(props.addAccessStatus) ?
                <div className='misc'>
                    < AddUser
                        accessChange={props.accessChange}
                        addAccess={props.addAccess}
                        regretAccess={props.regretAccess}
                    />
                </div> :
                <></>
            }
        </div>
    );
}
