import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import { Editor } from '@tinymce/tinymce-react';

// import EditorView from './components/EditorView';
import Login from './components/Login';
import Register from './components/Register';
import LogoutLink from './components/LogoutLink';
import LoginLink from './components/LoginLink';
import Toolbar from './components/Toolbar';
import DocumentHeader from './components/DocumentHeader';
import OpenMenu from './components/OpenMenu';
import AddAccess from './components/AddAccess';

import './App.css';

import apiPost from './services/api-post';
import apiPut from './services/api-put';
import apiDelete from './services/api-delete';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'https://jsramverk-editor-jeso20.azurewebsites.net';
// const ENDPOINT = 'https://localhost:1337';
const socket = socketIOClient(ENDPOINT);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.history;
        this.editorRef = React.createRef();
        this.state = {
            token: null,
            userId: null,
            ownerId: null,
            addAccessStatus: false,
            addEmail: null,
            auth: false,
            email: null,
            name: null,
            password: null,
            baseurl: 'https://jsramverk-editor-jeso20.azurewebsites.net',
            // siteUrl: '~jeso20/editor',
            siteUrl: '/~jeso20/editor',
            docTitle: '',
            documentId: null,
            status: 'documents gone',
            documents: {
                owner: [],
                access: []
            },

        };
    }

    docTitleChange = (e) => {
        this.setState({docTitle: e.target.value});
        socket.emit('title', {
            _id: this.state.documentId,
            title: e.target.value
        });
    }

    textChange = () => {
        socket.emit('editor', {
            _id: this.state.documentId,
            text: this.editorRef.current.getContent()
        });
    }

    save = async () => {
        let that = this;

        if (that.editorRef.current && that.state.userId) {
            if (that.state.documentId) {
                let body = {
                    _id: that.state.ownerId || that.state.userId,
                    documentId: that.state.documentId,
                    name: (that.state.docTitle.length > 0) ? that.state.docTitle : 'document',
                    html: that.editorRef.current.getContent(),

                };

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
                    html: that.editorRef.current.getContent()
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
            _id: that.state.userId
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

        let body = {
            _id: that.state.userId
        };

        let response = await apiPost(
            `${that.state.baseurl}/db/document`,
            body,
            that.state.token,
        );


        that.setState({
            status: 'documents',
            documents: response
        });
    }

    open = async (e) => {
        let that = this;

        let oldId = that.state.documentId;

        let doc = await that.state.documents.owner.filter( await function(document) {
            return document._id === e.target.parentElement.id;
        })[0];

        if (!doc) {
            doc = await that.state.documents.access.filter( await function(document) {
                return document._id === e.target.parentElement.id;
            })[0];
        }

        that.setState({
            status: 'documents gone',
            documentId: doc._id,
            docTitle: doc.name,
            ownerId: doc.owner || null
        });
        socket.emit('create', {
            newId: that.state.documentId,
            oldId: oldId
        });

        if (that.editorRef.current) {
            that.editorRef.current.setContent((doc.html) ? doc.html : '');
        }
    }

    deleteDocument = async (e) => {
        let that = this;

        let documentId = e.target.parentElement.parentElement.id;

        let body = {
            _id: that.state.userId,
            documentId: documentId
        };

        let response = await apiDelete(
            `${that.state.baseurl}/db/document/delete`,
            body,
            that.state.token,
        );

        that.setState({documents: response});
    }

    getAccessDocument = () => {
        let that = this;

        that.setState({ addAccessStatus: true });
    }

    buttons = {
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
            }
        ],
        access: {
            icon: 'person_add',
            onClick: this.getAccessDocument,
            id: 'access-btn'
        }
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



    EditorView = () => {
        return (
            <>
                <DocumentHeader
                    title={this.state.docTitle}
                    headerChange={this.docTitleChange}
                />
                {(this.state.auth) ?
                    <Toolbar
                        buttons={this.buttons}
                        owner={this.state.ownerId}
                        documentId={this.state.documentId}
                        addAccessStatus={this.state.addAccessStatus}
                        addAccess={this.addAccess}
                        accessChange={this.accessChange}
                        regretAccess={this.regretAccess}
                    /> :
                    <></>
                }

                <OpenMenu
                    status={this.state.status}
                    documents={this.state.documents}
                    open={this.open}
                    deleteDocument={this.deleteDocument}
                    getAccessDocument={this.getAccessDocument}
                />
                <Editor
                    onInit={(evt, editor) => this.editorRef.current = editor}
                    onKeyUp={this.textChange}
                    initialValue=''
                    apiKey='dcdovqi8pqzlmcoehtyvcyn4ofpg4050ojz2c0erbvk4ffas'
                    init={{
                        height: 500,
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
                        content_style: `body {
                            font-family:Helvetica,Arial,sans-serif; font-size:14px
                        }`
                    }}
                />
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
                                    emailChange={this.emailChange}
                                    passwordChange={this.passwordChange}
                                    siteUrl={this.state.siteUrl}
                                />
                            </Route>
                            <Route path={`${this.state.siteUrl}/register`}>
                                <Register
                                    auth={this.state.auth}
                                    register={this.register}
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
