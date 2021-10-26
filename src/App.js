import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import { Editor } from '@tinymce/tinymce-react';
import CodeEditor from '@monaco-editor/react';
// import html2PDF from 'jspdf-html2canvas';

// import { saveAs } from 'file-saver';
import axios from 'axios';

// import EditorView from './components/EditorView';
import Login from './components/Login';
import Register from './components/Register';
import LogoutLink from './components/LogoutLink';
import LoginLink from './components/LoginLink';
import Toolbar from './components/Toolbar';
import DocumentHeader from './components/DocumentHeader';
import OpenMenu from './components/OpenMenu';
import AddAccess from './components/AddAccess';
import PDFDownload from './components/PDFDownload';
import CodeOutput from './components/CodeOutput';
import Comments from './components/Comments';

import './App.css';

import apiPost from './services/api-post';
// import apiPostPdf from './services/api-post-pdf';
import apiPut from './services/api-put';
import apiDelete from './services/api-delete';

import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'https://jsramverk-editor-jeso20.azurewebsites.net';
const ENDPOINT = 'https://localhost:1337';
const socket = socketIOClient(ENDPOINT);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.history;
        this.editorRef = React.createRef();
        this.codeEditorRef = React.createRef();
        this.state = {
            token: null,
            userId: null,
            ownerId: null,
            addAccessStatus: false,
            addCommentStatus: false,
            addEmail: null,
            addComment: null,
            auth: false,
            email: null,
            name: null,
            password: null,
            // baseurl: 'https://jsramverk-editor-jeso20.azurewebsites.net',
            // siteUrl: '/~jeso20/editor',
            baseurl: 'http://localhost:1337',
            siteUrl: '',
            docTitle: '',
            documentId: null,
            status: 'documents gone',
            documents: {
                owner: [],
                access: []
            },
            comments: [],
            pdfLink: null,
            editorType: 'text',
            codeOutput: '',
            commentCounter: 1,
            editComment: null
        };
    }

    docTitleChange = (e) => {
        this.setState({docTitle: e.target.value});
        socket.emit('title', {
            _id: this.state.documentId,
            title: e.target.value
        });
    }

    textChange = async () => {
        socket.emit('editor', {
            _id: this.state.documentId,
            text: this.editorRef.current.getContent()
        });

        let changeComments = false;

        let commentsNumber = [];

        let root = this.editorRef.current.dom.getRoot();

        for (let i = 0; i < root.children.length; i++) {
            let child = root.children[i];

            if (child.id && child.id.startsWith('comment-')) {
                let ids = child.id.replace('comment-', '').split('-');

                ids.map((idForComment) => {
                    commentsNumber.push(idForComment);
                });
            }
        }



        await this.state.comments.map(async (comment) => {
            if (!commentsNumber.includes(`${comment.number}`)) {
                console.log('remove');
                changeComments = true;
                console.log(changeComments);

                let body = {
                    _id: this.state.userId,
                    documentId: this.state.documentId,
                    comment: {
                        crud: 'delete',
                        _id: comment._id
                    }
                };

                await apiPut(
                    `${this.state.baseurl}/db/document/update`,
                    body,
                    this.state.token,
                );
            }

            if (changeComments) {
                console.log('get comments');
                await this.getComments();

                changeComments = false;
            }
        });
    }

    save = async () => {
        let that = this;

        let text = (that.state.editorType === 'text') ?
            that.editorRef.current.getContent() :
            (that.state.editorType === 'code') ?
                that.codeEditorRef.current.getValue() :
                '';

        console.log(text);

        if ((that.editorRef.current || that.codeEditorRef) && that.state.userId) {
            console.log();
            if (that.state.documentId) {
                console.log(that.state.ownerId);
                let body = {
                    _id: that.state.ownerId || that.state.userId,
                    documentId: that.state.documentId,
                    name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'document',
                    html: text,
                    type: that.state.editorType
                };

                console.log(body);

                await apiPut(
                    `${that.state.baseurl}/db/document/update`,
                    body,
                    that.state.token,
                );

                that.setState({status: 'documents gone'});
            } else {
                let body = {
                    _id: that.state.userId,
                    name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'document',
                    html: text,
                    type: that.state.editorType
                };

                let response = await apiPost(
                    `${that.state.baseurl}/db/document/add`,
                    body,
                    that.state.token,
                );

                that.setState({
                    documentId: response._id,
                    status: 'documents gone'
                });
            }
        }
    }

    newDocument = async () => {
        let that = this;

        let body = {
            name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'New document',
            html: '',
            _id: that.state.userId,
            type: that.state.editorType
        };

        let oldId = that.state.documentId;

        let response = await apiPost(
            `${that.state.baseurl}/db/document/add`,
            body,
            that.state.token,
        );

        that.setState({
            documentId: response._id,
            docTitle: '',
            status: 'documents gone'
        });
        that.editorRef.current.setContent('');
        socket.emit('create', {
            newId: that.state.documentId,
            oldId: oldId
        });
    }

    openMenu = async () => {
        let that = this;

        let body = JSON.stringify({
            query: `{
                documents(userId: "${that.state.userId}") {
                    owner {
                        _id
                        name
                        html
                        type
                        comments {
                            _id
                            number
                            text
                            user
                            time
                        }
                    }
                    access {
                        _id
                        documents {
                            _id
                            name
                            html
                            type
                            comments {
                                _id
                                number
                                text
                                user
                                time
                            }
                        }
                    }
                }
            }`
        });

        let response = await apiPost(
            `${that.state.baseurl}/graphql`,
            body,
            that.state.token
        );

        console.log(response.data.documents);

        that.setState({
            status: 'documents',
            documents: response.data.documents,
            addAccessStatus: false,
            addCommentStatus: false,
        });
    }

    open = async (e) => {
        let that = this;

        let oldId = that.state.documentId;

        let doc = null;

        doc = await that.state.documents.owner.filter( await function(document) {
            return document._id === e.target.parentElement.id;
        })[0];

        if (!doc) {
            that.state.documents.access.map((user) => {
                user.documents.map((userDoc) => {
                    if (userDoc._id === e.target.parentElement.id) {
                        doc = userDoc;
                        doc.owner = user._id;
                    }
                });
            });
        }

        if (that.editorRef.current && doc.type === 'text') {
            that.editorRef.current.setContent((doc.html) ? doc.html : '');
        } else if (that.codeEditorRef.current && doc.type === 'code') {
            console.log('code');
            that.codeEditorRef.current.setValue(doc.html);
        }

        console.log(doc.html);
        let commentNumber = 1;

        if (doc.comments) {
            if (doc.comments.length > 0) {
                doc.comments.map((comment) => {
                    commentNumber = (comment.number > commentNumber) ?
                        comment.number : commentNumber;
                });

                commentNumber += 1;
            }
        }


        console.log(commentNumber);

        that.setState({
            status: 'documents gone',
            documentId: doc._id,
            docTitle: doc.name,
            ownerId: doc.owner || null,
            editorType: doc.type,
            comments: doc.comments || [],
            commentCounter: commentNumber
        });
        socket.emit('create', {
            newId: that.state.documentId,
            oldId: oldId
        });



        doc = null;
    }

    toPDF = async () => {
        let that = this;

        let body = {
            title: that.state.docTitle,
            html: that.editorRef.current.getContent()
        };

        let response = await axios.post(
            `${that.state.baseurl}/pdf`,
            body,
            {
                headers: {
                    'x-access-token': that.state.token
                },
                responseType: 'blob'
            }
        );

        let file = new Blob (
            [response.data],
            { type: 'application/pdf' }
        );

        const fileURL = window.URL.createObjectURL(file);

        that.setState({
            pdfLink: fileURL,
            status: 'documents gone'
        });
    }

    deleteDocument = async (e) => {
        let that = this;

        let documentId = e.target.parentElement.parentElement.id;

        let body = {
            _id: that.state.userId,
            documentId: documentId
        };

        await apiDelete(
            `${that.state.baseurl}/db/document/delete`,
            body,
            that.state.token,
        );

        body = JSON.stringify({
            query: `{
                documents(userId: "${that.state.userId}") {
                    owner {
                        _id
                        name
                        html
                        type
                        comments {
                            _id
                            number
                            text
                            user
                            time
                        }
                    }
                    access {
                        _id
                        documents {
                            _id
                            name
                            html
                            type
                            comments {
                                _id
                                number
                                text
                                user
                                time
                            }
                        }
                    }
                }
            }`
        });

        let response = await apiPost(
            `${that.state.baseurl}/graphql`,
            body,
            that.state.token
        );


        that.setState({
            documents: response.data.documents
        });
    }

    getAccessDocument = () => {
        let that = this;

        that.setState({
            addAccessStatus: true,
            status: 'documents gone'
        });
    }

    getCommentDocument = () => {
        let that = this;

        that.setState({
            addCommentStatus: true,
            status: 'documents gone'
        });
    }

    changeMode = () => {
        let that = this;

        let newType = (that.state.editorType === 'text') ? 'code' : 'text';

        that.editorRef.current.setContent('');
        that.codeEditorRef.current.setValue('');

        that.setState({
            editorType: newType,
            docTitle: '',
            documentId: null,
            status: 'documents gone'
        });
    }

    runCode = async () => {
        let that = this;

        let body = {
            code: that.codeEditorRef.current.getValue()
        };

        let result = await apiPost(
            `${that.state.baseurl}/code`,
            body,
            that.state.token
        );

        that.setState({
            codeOutput: result.output,
            status: 'documents gone'
        });
    }

    generateButtons = () => {
        let buttons = {
            misc: [
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
                {
                    name: (this.state.editorType === 'text') ? 'Code' : 'Text',
                    icon: (this.state.editorType === 'text') ? 'code' : 'title',
                    onClick: this.changeMode,
                    id: 'mode-btn'
                },
            ],

            access: []
        };

        if (!this.state.ownerId) {
            buttons.access.push({
                icon: 'person_add',
                onClick: this.getAccessDocument,
                id: 'access-btn'
            });
        }

        if (this.state.editorType === 'text') {
            buttons.access.push({
                name: 'Pdf',
                icon: 'picture_as_pdf',
                onClick: this.toPDF,
                id: 'pdf-btn'
            });
            buttons.access.push({
                name: 'Comment',
                icon: 'picture_as_pdf',
                onClick: this.getCommentDocument,
                id: 'comment-btn'
            });
        } else {
            buttons.access.push({
                icon: 'present_to_all',
                onClick: this.runCode,
                id: 'run-code-btn'
            });
        }


        return buttons;
    }



    nameChange = (e) => {
        this.setState({name: e.target.value});
    }

    emailChange = (e) => {
        this.setState({email: e.target.value});
    }

    passwordChange = (e) => {
        this.setState({password: e.target.value});
    }

    accessChange = (e) => {
        this.setState({addEmail: e.target.value});
    }

    commentChange = (e) => {
        this.setState({addComment: e.target.value});
    }

    editCommentChange = (e) => {
        let editComment = this.state.editComment;

        editComment.newText = e.target.value;
        this.setState({editComment: editComment});
    }

    login = async () => {
        let that = this;

        let body = {
            email: that.state.email,
            password: that.state.password
        };

        let response = await apiPost(`${that.state.baseurl}/auth/login`, body);

        if (response.success) {
            that.setState({
                auth: true,
                password: null,
                email: null,
                name: response.name,
                token: response.token,
                userId: response.userId
            });
        }
    }

    register = async () => {
        let that = this;

        let body = {
            name: that.state.name,
            email: that.state.email,
            password: that.state.password
        };

        let response = await apiPost(`${that.state.baseurl}/auth/register`, body);

        if (response.success) {
            that.setState({
                auth: true,
                password: null,
                email: null,
                name: response.name,
                token: response.token,
                userId: response.userId
            });
        }
    }

    addAccess = async () => {
        let that = this;

        let body = {
            _id: that.state.userId,
            documentId: that.state.documentId,
            allowed_users: that.state.addEmail
        };

        await apiPut(
            `${that.state.baseurl}/db/document/update`,
            body,
            that.state.token,
        );

        body = {
            to: that.state.addEmail,
            user: that.state.name,
            title: that.state.docTitle,
            server: window.location.origin
        };

        let message = await apiPost(
            `${that.state.baseurl}/mail`,
            body,
            that.state.token,
        );

        console.log(message);

        that.setState({
            ownerId: null,
            addAccessStatus: false,
            addEmail: null
        });
    }

    regretAccess = () => {
        let that = this;

        that.setState({
            ownerId: null,
            addAccessStatus: false,
            addEmail: null
        });
    }

    getComments = async () => {
        console.log('Will get comments');
        let body = JSON.stringify({
            query: `{
                comments (
                    userId: "${this.state.userId}",
                    documentId: "${this.state.documentId}"
                ) {
                    _id
                    number
                    text
                    user
                    time
                }
            }`
        });

        console.log(body);

        let response = await apiPost(
            `${this.state.baseurl}/graphql`,
            body,
            this.state.token
        );

        console.log(response.data.comments);

        this.setState({comments: response.data.comments});

        console.log(this.state.comments);
    }

    addComment = async () => {
        let curId = this.editorRef.current.dom.getAttrib(
            this.editorRef.current.selection.getNode(),
            'id'
        );

        let newId = (curId) ?
            `${curId}-${this.state.commentCounter}` :
            `comment-${this.state.commentCounter}`;

        console.log(curId);
        this.editorRef.current.dom.setAttrib(
            this.editorRef.current.selection.getNode(),
            'id',
            newId
        );

        let body = {
            _id: this.state.userId,
            documentId: this.state.documentId,
            html: this.editorRef.current.getContent(),
            comment: {
                crud: 'add',
                number: this.state.commentCounter,
                text: this.state.addComment,
                user: this.state.name
            }
        };

        await apiPut(
            `${this.state.baseurl}/db/document/update`,
            body,
            this.state.token,
        );

        this.setState({
            addCommentStatus: false,
            addComment: null,
            commentCounter: this.state.commentCounter + 1
        });

        await this.getComments();
    }

    regretComment = () => {
        let that = this;

        that.setState({
            addCommentStatus: false,
            addComment: null
        });
    }

    highlightComment = (e) => {
        let doc = this.editorRef.current.dom.getRoot();

        let target = e.target;

        let noHighlight = [
            'crud-button',
            'crud-button-2',
            'comment-textarea',
            'material-icons-outlined'
        ];

        console.log(!noHighlight.includes(target.className));

        console.log(target.className);

        if (!noHighlight.includes(target.className)) {
            while (target.className !== 'comment-div') {
                target = target.parentElement;
            }

            let commentId = target.id.split('-')[1];

            let tempId = '';

            for (let i = 0; i < doc.children.length; i++) {
                let child = doc.children[i];

                if (child.id.startsWith('comment-')) {
                    let tempIds = child.id.replace('comment-', '').split('-');

                    if (tempIds.includes(commentId)) {
                        tempId = child.id;
                    }
                }
            }

            this.editorRef.current.dom.addClass(
                this.editorRef.current.dom.get(tempId), 'highlight'
            );

            setTimeout(() => {
                this.editorRef.current.dom.removeClass(
                    this.editorRef.current.dom.get(tempId), 'highlight'
                );
            }, 3000);
        }
    }

    deleteComment = async (e) => {
        let deleteId = e.target.parentElement.parentElement.id.split('-');

        console.log(deleteId);
        let doc = this.editorRef.current.dom.getRoot();

        let tempId = '';

        let newId = '';

        for (let i = 0; i < doc.children.length; i++) {
            let child = doc.children[i];

            if (child.id.startsWith('comment-')) {
                let tempIds = child.id.replace('comment-', '').split('-');

                if (tempIds.includes(deleteId[1])) {
                    tempId = child.id;

                    if (tempIds.length > 1) {
                        newId = 'comment';
                        tempIds.map((idToAdd) => {
                            if (idToAdd !== deleteId[1]) {
                                newId += `-${idToAdd}`;
                            }
                        });
                    }
                }
            }
        }


        if (newId) {
            this.editorRef.current.dom.setAttrib(
                this.editorRef.current.dom.get(tempId),
                'id',
                newId
            );
        } else {
            this.editorRef.current.dom.removeAllAttribs(
                this.editorRef.current.dom.get(tempId)
            );
        }


        let body = {
            _id: this.state.userId,
            documentId: this.state.documentId,
            comment: {
                crud: 'delete',
                _id: deleteId[0]
            }
        };

        await apiPut(
            `${this.state.baseurl}/db/document/update`,
            body,
            this.state.token,
        );

        await this.getComments();
    }

    activeteCommentEdit = (e) => {
        let parent = e.target;

        while (parent.className !== 'comment-div') {
            parent = parent.parentElement;
        }
        console.log(parent.children[1].innerHTML);
        this.setState({
            editComment: {
                id: parent.id.split('-'),
                initText: parent.children[1].innerHTML,
                newText: ''
            }
        });
    }

    regretEditComment = () => {
        this.setState({editComment: null});
    }


    saveUpdatedComment = async () => {
        // console.log(this.state);
        let commentId = this.state.editComment.id[0];

        let body = {
            _id: this.state.userId,
            documentId: this.state.documentId,
            comment: {
                crud: 'update',
                _id: commentId,
                user: this.state.name,
                text: this.state.editComment.newText
            }
        };

        await apiPut(
            `${this.state.baseurl}/db/document/update`,
            body,
            this.state.token,
        );

        await this.getComments();
        this.regretEditComment();
    }

    removePDFLink = () => {
        let that = this;

        that.setState({
            pdfLink: null
        });
    }

    initTextEditor = (evt, editor) => {
        let that = this;

        that.editorRef.current = editor;
    }

    mountCodeEditor = (editor) => {
        let that = this;

        that.codeEditorRef.current = editor;
    }

    EditorView = () => {
        return (
            <>
                {
                    (this.state.pdfLink) ?
                        <PDFDownload
                            href={this.state.pdfLink}
                            title={this.state.docTitle}
                            removeLink={this.removePDFLink}
                        /> :
                        <></>
                }
                <DocumentHeader
                    title={this.state.docTitle}
                    headerChange={this.docTitleChange}
                    editorType={this.state.editorType}
                />
                {(this.state.auth) ?
                    <Toolbar
                        buttons={this.generateButtons()}
                        owner={this.state.ownerId}
                        documentId={this.state.documentId}
                        addAccessStatus={this.state.addAccessStatus}
                        addAccess={this.addAccess}
                        accessChange={this.accessChange}
                        regretAccess={this.regretAccess}
                        addCommentStatus={this.state.addCommentStatus}
                        addComment={this.addComment}
                        commentChange={this.commentChange}
                        regretComment={this.regretComment}
                        editorType={this.state.editorType}
                    /> :
                    <></>
                }

                <OpenMenu
                    status={this.state.status}
                    documents={this.state.documents}
                    open={this.open}
                    deleteDocument={this.deleteDocument}
                    getAccessDocument={this.getAccessDocument}
                    editorType={this.state.editorType}
                />
                <div className={(this.state.editorType !== 'text') ? 'gone' : 'text-editor-div'}>
                    <Editor
                        onInit={this.initTextEditor}
                        onKeyUp={this.textChange}
                        initialValue=''
                        apiKey='dcdovqi8pqzlmcoehtyvcyn4ofpg4050ojz2c0erbvk4ffas'
                        init={{
                            height: '70vh',
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview',
                                'searchreplace visualblocks code fullscreen anchor',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: `
                                body {
                                    font-family:Helvetica,Arial,sans-serif;
                                    font-size:14px;
                                    line-height: 1.6;
                                    padding-right: 310px;
                                }
                                .highlight {
                                    background-color: #98a4b0;
                                }
                                p {
                                    margin: 0;
                                    padding bottom: 0;
                                }
                            `
                        }}
                    />
                    <Comments
                        comments={this.state.comments}
                        highlight={this.highlightComment}
                        deleteComment={this.deleteComment}
                        activeteCommentEdit={this.activeteCommentEdit}
                        editComment={this.state.editComment}
                        editCommentChange={this.editCommentChange}
                        regretEditComment={this.regretEditComment}
                        saveUpdatedComment={this.saveUpdatedComment}
                    />
                </div>
                <div className={(this.state.editorType !== 'code') ? 'gone' : 'code-div'}>
                    <CodeEditor
                        onMount={this.mountCodeEditor}
                        height="70vh"
                        defaultLanguage="javascript"
                        IEditorPaddingOptions={{top: '1em', bottom: '1em'}}
                        theme='vs-dark'
                    />
                    <CodeOutput
                        code={this.state.codeOutput}
                        clear={() => {this.setState({codeOutput: ''});}}
                    />
                </div>
            </>
        );
    }

    render() {
        socket.on('title', (title) => {
            if (this.state.docTitle !== title) {
                this.setState({docTitle: title});
            }
        });
        socket.on('editor', (text) => {
            if (this.state.docTitle !== text) {
                this.editorRef.current.setContent(text);
            }
        });

        return (
            <>
                <Router>
                    <div className='header'>
                        <Link
                            to={`${this.state.siteUrl}/`}
                            className='header-title'
                        >
                            Editor of the people
                        </Link>
                        <nav>
                            <ul>
                                <li>
                                    {
                                        (this.state.auth) ?
                                            <LogoutLink
                                                user={this.state.name}
                                                siteUrl={this.state.siteUrl}
                                            />:
                                            <LoginLink
                                                siteUrl={this.state.siteUrl}
                                            />
                                    }
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='container'>
                        <Switch>
                            <Route path={`${this.state.siteUrl}/login`}>
                                <Login
                                    auth={this.state.auth}
                                    login={this.login}
                                    stateEmail={this.state.email}
                                    emailChange={this.emailChange}
                                    passwordChange={this.passwordChange}
                                    siteUrl={this.state.siteUrl}
                                />
                            </Route>
                            <Route path={`${this.state.siteUrl}/register`}>
                                <Register
                                    auth={this.state.auth}
                                    register={this.register}
                                    stateEmail={this.state.email}
                                    nameChange={this.nameChange}
                                    emailChange={this.emailChange}
                                    passwordChange={this.passwordChange}
                                    siteUrl={this.state.siteUrl}
                                />
                            </Route>
                            <Route path={`${this.state.siteUrl}/logout`} render={() => (
                                this.setState({
                                    auth: false,
                                    documents: {
                                        owner: [],
                                        access: []
                                    },
                                    userId: null,
                                    ownerId: null,
                                    addAccessStatus: false,
                                    addEmail: null,
                                    email: null,
                                    name: null,
                                    password: null,
                                    docTitle: '',
                                    documentId: null,
                                    status: 'documents gone',
                                }),
                                <Redirect to={`${this.state.siteUrl}/`}
                                />)
                            }/>
                            <Route path={`${this.state.siteUrl}/documents`}>
                                <AddAccess
                                    accessChange={this.accessChange}
                                    addAccess={this.addAccess}
                                />
                            </Route>
                            <Route path='/'>
                                <this.EditorView
                                    token={this.state.token}
                                    auth={this.state.auth}
                                    userId={this.state.userId}
                                    url={this.state.baseurl}
                                />
                            </Route>
                        </Switch>

                    </div>
                    <div className='footer'>
                        <p>© Copyright Jesper Stolt 2021</p>
                    </div>
                </Router>

            </>
        );
    }
}
