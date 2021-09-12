import React from 'react';
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

function DocumentHeader(props) {
    // console.log(props);
    return (
        <div className="documentHeader">
            <input type="text" value={props.title} onChange={props.headerChange} placeholder="Enter an name" />
        </div>
    )
}

function OpenMenu(props) {
    console.log(props);
    return(
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
                }, index)
            })}
            </tbody>
            </table>
        </div>
    )

}

function Document(props, index) {
    // console.log(props);
    return (
        <tr id={props._id} onClick={props.open} key={index} className="document">
            <td>{props.name}</td>
            <td >{props.date}</td>
        </tr>
    )
}


export default class App extends React.Component {
    constructor(props) {
       super(props);
       this.editorRef = React.createRef();
       this.state = {
            documentTitle: "",
            url: "https://jsramverk-editor-jeso20.azurewebsites.net/db",
            editorRef: this.editorRef,
            documentId: null,
            open: {
                status: "documents gone",
                documents: []
            }
        }
   }

    documentTitleChange = (e) => {
        this.setState({documentTitle: e.target.value});
    }

    save = () => {
        let that = this;

        if (that.state.editorRef.current) {
            if (that.state.documentId) {
                console.log(that.state.documentTitle.length);

                let body = {
                    name: (that.state.documentTitle.length > 0) ? that.state.documentTitle : "document",
                    html: that.state.editorRef.current.getContent(),
                    _id: that.state.documentId
                };

                fetch(that.state.url, {
                    method: 'put',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(body)
                    }
                ).then(function(result) {
                    that.setState(
                        {
                            open: {
                                status: "documents gone",
                                documents: that.state.open.documents
                            }
                        }
                    )
                })
            } else {
                let body = {
                    name: (that.state.documentTitle.length > 0) ? that.state.documentTitle : "document",
                    html: that.state.editorRef.current.getContent()
                };


                fetch(that.state.url, {
                    method: 'post',
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(body)
                }).then(response => response.json())
                .then(function(data) {
                    that.setState({documentId: data._id})

                    that.setState(
                        {
                            open: {
                                status: "documents gone",
                                documents: that.state.open.documents
                            }
                        }
                    )
                })
            }

            // editorRef.current.setContent("");
            //
            // console.log(body);
        }
    }

    newDocument = () => {
        console.log("new");
        let that = this;
        console.log(that.state.url);
        fetch(that.state.url, {
            method: 'post',
            headers: {'content-type': 'application/json'}
        }).then(response => response.json())
        .then(function(data) {
            console.log("im in");
            that.setState({documentId: data._id});
            that.setState({documentTitle: ""});
            that.editorRef.current.setContent("")

            that.setState(
                {
                    open: {
                        status: "documents gone",
                        documents: that.state.open.documents
                    }
                }
            )
        })
    }

    openMenu = () => {
        let date = new Date();
        console.log(-date.getTimezoneOffset());
        let that = this;
        console.log(that.state.url);
        fetch(this.state.url, {
            method: 'get'
        }).then(response => response.json())
        .then(function(data) {
            that.setState(
                {
                    open: {
                        status: "documents",
                        documents: data
                    }
                }
            )
        })
    }

    open = (e) => {
        let that = this;

        let doc = that.state.open.documents.filter(function(document) {
            return document._id === e.target.parentElement.id;
        })[0];

        that.setState(
            {
                open: {
                    status: "documents gone",
                    documents: that.state.open.documents
                }
            }
        )
        that.setState({documentId: doc._id})
        that.setState({documentTitle: doc.name})
        that.editorRef.current.setContent((doc.html) ? doc.html : "");
        // console.log(that.state.documentTitle);



        console.log(doc);
    }

    log = () => {
        // if (this.state.editorRef.current) {
        //     this.state.console.log(this.state.editorRef.current.getContent());
        // }
        console.log(this.state);
    }

    buttons = [
        {
            name: "Save",
            icon: "save",
            onClick: this.save
        },
        {
            name: "Open",
            icon: "folder_open",
            onClick: this.openMenu
        },
        {
            name: "New",
            icon: "note_add",
            onClick: this.newDocument
        },
    ]
    render() {
        return (
            <>
                <div className="header">
                    <span className="header-title">Editor of the people</span>
                </div>
                <div className="container">
                    <DocumentHeader
                        title={this.state.documentTitle}
                        headerChange={this.documentTitleChange}
                    />
                    <Toolbar
                        buttons={this.buttons}
                    />
                    <OpenMenu
                        status={this.state.open.status}
                        documents={this.state.open.documents}
                        open={this.open}
                    />
                    <Editor
                    onInit={(evt, editor) => this.editorRef.current = editor}
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
        )
    }
}
