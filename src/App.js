import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function Toolbar(props) {

    return (
        <div>
            {props.buttons.map(function(button, index) {
                return Button(button, index)
            })}
        </div>
    );
}

function Button(props, index) {
    console.log(props);
    return (
        <div key={index} className="button" onClick={props.onClick}>
            <p>{props.name}</p>
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
            <button onClick={log}>Log editor content</button>
        </>
    );
}
