'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
// const database = admin.database();

exports.makeAnswer = functions.database.ref('/chatRoom/{uid}/message/{messageID}')
    .onCreate(event => {
        const message = event.data;
        const type_message = message.child('type').val();
        const sender_message = message.child('sender').val();
        const text = message.child('text').val();

        if (type_message === 'answer' && sender_message === 'user') {
            console.log('new message 1', type_message, sender_message);

            const new_message = {
                type: 'answer',
                sender: 'bot',
                sendingTime: '2017-10-01 13:48:57',
                text: 'ไม่พบข้อมูล'
            };
            return event.data.ref.parent.push().set(new_message);

            // admin.database().ref('place').orderByChild('name').equalTo(text).once('value', function(snapshot) {
            //     const place = snapshot.val();
            //     console.log(place);
            // });
        }
    });