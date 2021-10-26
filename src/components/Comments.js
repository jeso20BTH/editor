import React from 'react';
import Comment from './Comment';

export default function Comments(props) {
    return (
        <div className='comments-div'>
            <h1>Comments</h1>
            {props.comments.map((comment) => {
                comment.highlight = props.highlight;
                comment.deleteComment = props.deleteComment;
                comment.activeteCommentEdit = props.activeteCommentEdit;
                comment.editComment = props.editComment;
                comment.regretEditComment = props.regretEditComment;
                comment.saveUpdatedComment = props.saveUpdatedComment;
                comment.editCommentChange = props.editCommentChange;
                return Comment(comment);
            })}
        </div>
    );
}
