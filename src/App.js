import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './App.css';

function Toolbar(props) {

    return (
        <div className="toolbar">
            <div className="misc">
                {props.buttons.map(function(button, index) {
                    return Button(button, index)
                })}
            </div>
        </div>
    );
}

function Button(props, index) {
    return (
        <div key={index} className="button" onClick={props.onClick}>
            <i className="material-icons-outlined">{props.icon}</i>
            <div className="button-text">
                <p>{props.name}</p>
            </div>
        </div>
    )
}

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const buttons = [
        {
            name: "Save",
            icon: "save",
            onClick: log
        }
    ]
    return (
        <>
            <div className="header">
                <span className="header-title">Editor of the people</span>
            </div>
            <div className="container">
                <Toolbar
                    buttons={buttons}
                />
                <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                apiKey="dcdovqi8pqzlmcoehtyvcyn4ofpg4050ojz2c0erbvk4ffas"
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                />
            </div>
            <div className="footer">
                <p>© Copyright Jesper Stolt 2021</p>
            </div>
        </>
    );
}
