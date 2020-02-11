// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyBqcLZ0AgP2beG9NUFTWpR5fJNrtJfVeZI",
  authDomain: "fundoo-2b3c6.firebaseapp.com",
  databaseURL: "https://fundoo-2b3c6.firebaseio.com",
  projectId: "fundoo-2b3c6",
  storageBucket: "fundoo-2b3c6.appspot.com",
  messagingSenderId: "178418899459",
  appId: "1:178418899459:web:0bebfba48288709f00cc36",
  measurementId: "G-GVK61N271T"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();