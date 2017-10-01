'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

exports.makeAnswer = functions.database.ref('/chatRoom/{uid}/message/{messageID}')
    .onCreate(event => {
        const message = event.data;
        const type_message = message.child('type').val();
        const sender_message = message.child('sender').val();

        if (type_message === 'answer' && sender_message === 'user') {
            console.log('new message 1', message, type_message, sender_message);
            const new_message = {
                type: 'answer',
                sender: 'bot',
                sendingTime: '2017-10-01 13:48:57',
                text: 'นี่คือข้อความไหม่จากจิตติมา'
            };
            return event.data.ref.parent.push().set(new_message);
        } else {
            console.log('No data 1', message, type_message, sender_message);
            // const new_message = {
            //     type: 'answer',
            //     sender: 'bot',
            //     sendingTime: '2017-10-01 13:48:57',
            //     text: 'นี่คือข้อผิดพลาดจากจิตติมา'
            // };
            // return event.data.ref.parent.child('message').push().set(new_message);
        }
    });