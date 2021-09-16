import React from 'react';

import { Editor } from '@tinymce/tinymce-react';

import Toolbar from './components/Toolbar';
import DocumentHeader from './components/DocumentHeader';
import OpenMenu from './components/OpenMenu';

import apiGet from './services/api-get';
import apiPut from './services/api-put';
import apiPost from './services/api-post';

import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
        this.state = {
            docTitle: '',
            url: 'https://jsramverk-editor-jeso20.azurewebsites.net/db',
            editorRef: this.editorRef,
            documentId: null,
            status: 'documents gone',
            documents: []
        };
    }

    docTitleChange = (e) => {
        this.setState({docTitle: e.target.value});
    }

    save = async () => {
        let that = this;

        if (that.state.editorRef.current) {
            if (that.state.documentId) {
                let body = {
                    name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'document',
                    html: that.state.editorRef.current.getContent(),
                    _id: that.state.documentId
                };

                await apiPut(that.state.url, body);

                that.setState({status: 'documents gone'});
            } else {
                let body = {
                    name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'document',
                    html: that.state.editorRef.current.getContent()
                };

                let response = await apiPost(that.state.url, body);

                that.setState({
                    documentId: response._id,
                    status: 'documents gone'
                });
            }
        }
    }

    newDocument = async () => {
        let that = this;

        let response = await apiPost(that.state.url);

        that.setState({
            documentId: response._id,
            docTitle: '',
            status: 'documents gone'
        });
        that.editorRef.current.setContent('');
    }

    openMenu = async () => {
        let that = this;

        let response = await apiGet(that.state.url);

        that.setState({
            status: 'documents',
            documents: response
        });
    }

    open = async (e) => {
        let that = this;

        let doc = await that.state.documents.filter( await function(document) {
            return document._id === e.target.parentElement.id;
        })[0];

        that.setState({
            status: 'documents gone',
            documentId: doc._id,
            docTitle: doc.name
        });
        if (that.editorRef.current) {
            that.editorRef.current.setContent((doc.html) ? doc.html : '');
        }
    }

    buttons = [
        {
            name: 'Save',
            icon: 'save',
            onClick: this.save,
            id: 'save-btn'
        },
        {
            name: 'Open',
            icon: 'folder_open',
            onClick: this.openMenu,
            id: 'open-btn'
        },
        {
            name: 'New',
            icon: 'note_add',
            onClick: this.newDocument,
            id: 'new-btn'
        },
    ]
    render() {
        return (
            <>
                <div className='header'>
                    <span className='header-title'>Editor of the people</span>
                </div>
                <div className='container'>
                    <DocumentHeader
                        title={this.state.docTitle}
                        headerChange={this.docTitleChange}
                    />
                    <Toolbar
                        buttons={this.buttons}
                    />
                    <OpenMenu
                        status={this.state.status}
                        documents={this.state.documents}
                        open={this.open}
                    />
                    <Editor
                        onInit={(evt, editor) => this.editorRef.current = editor}
                        initialValue=''
                        apiKey='dcdovqi8pqzlmcoehtyvcyn4ofpg4050ojz2c0erbvk4ffas'
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
                            content_style: `body {
                                font-family:Helvetica,Arial,sans-serif; font-size:14px
                            }`
                        }}
                    />
                </div>
                <div className='footer'>
                    <p>© Copyright Jesper Stolt 2021</p>
                </div>
            </>
        );
    }
}
