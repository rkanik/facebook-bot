'use strict'

import firebase from 'firebase/app';
import 'firebase/firestore';

// Config
import config from './config'

// Initialize Firebase
const app = firebase.initializeApp(config);
const firestore = app.firestore()

// Collection reference
const Tasks = firestore.collection('tasks')

export {
    firebase, Tasks
}

export default app