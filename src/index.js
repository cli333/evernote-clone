import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDh0zQVMXpmk48Atx20FnV-AZLpv3cF5wc',
	authDomain: 'evernote-clone-72874.firebaseapp.com',
	databaseURL: 'https://evernote-clone-72874.firebaseio.com',
	projectId: 'evernote-clone-72874',
	storageBucket: 'evernote-clone-72874.appspot.com',
	messagingSenderId: '62284533927',
	appId: '1:62284533927:web:ad90c44338ac93f7198b82',
	measurementId: 'G-HDFME43H6B',
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
