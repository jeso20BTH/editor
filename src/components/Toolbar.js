import React from 'react';
import Button from './Button';
import AddUser from './AddUser';
import AddComment from './AddComment';

export default function Toolbar(props) {
    return (
        <div className={(props.editorType === 'text') ? 'toolbar' : 'toolbar dark'}>
            <div className="misc">
                {props.buttons.misc.map(function(button, index) {
                    return Button(button, index);
                })}
            </div>
            {(props.documentId && !props.addAccessStatus && !props.addCommentStatus ) ?
                <div className='misc'>
                    {props.buttons.access.map(function(button, index) {
                        return Button(button, index);
                    })}
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
            {(props.addCommentStatus) ?
                <div className='misc'>
                    < AddComment
                        commentChange={props.commentChange}
                        addComment={props.addComment}
                        regretComment={props.regretComment}
                    />
                </div> :
                <></>
            }
        </div>
    );
}
