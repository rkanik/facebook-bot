'use strict'

const firebase = require("firebase/app");
require("firebase/firestore");

// Config
const config = require('./config')

// Initialize Firebase
const app = firebase.initializeApp(config);
const firestore = app.firestore()

// Collection reference
const Tasks = firestore.collection('tasks')

module.exports = {
    app, firestore, Tasks
}