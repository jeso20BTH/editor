import React from 'react';

export default function Comment(props) {
    return (
        <div
            key={props._id}
            id={`${props._id}-${props.number}`}
            className='comment-div'
            onClick={props.highlight}
        >
            <div className='comment-info-div'>
                <span className='comment-info-text'>{props.user}</span>
                <span className='comment-info-text'>{props.time}</span>
                {(!props.editComment) ?
                    <div className='comment-crud-div'>
                        <button className='crud-button' onClick={props.deleteComment} >
                            <i className='material-icons-outlined'>
                                delete
                            </i>
                        </button>
                        <button className='crud-button' onClick={props.activeteCommentEdit}>
                            <i className='material-icons-outlined'>
                                edit
                            </i>
                        </button>
                    </div> :
                    <></>
                }
            </div>
            {(!props.editComment || props.editComment.id[0] !== props._id) ?
                <span className='comment-text'>{props.text}</span> :
                <>
                    <textarea
                        className='comment-textarea'
                        value={(props.editComment.newText) ?
                            props.editComment.newText :
                            props.editComment.initText
                        }
                        onChange={props.editCommentChange}
                    ></textarea>
                    <div className='comment-crud-div-2'>
                        <button className='crud-button-2' onClick={props.regretEditComment}>
                            <i className='material-icons-outlined'>
                                clear
                            </i>
                        </button>
                        <button className='crud-button-2' onClick={props.saveUpdatedComment}>
                            <i className='material-icons-outlined'>
                                done
                            </i>
                        </button>
                    </div>
                </>
            }

        </div>
    );
}
