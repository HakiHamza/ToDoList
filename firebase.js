var firebaseConfig = {
  apiKey: "AIzaSyCV1SJsJB13Tk2gER3zRXKAFCpRFoI6a9c",
  authDomain: "to-do-live-f044a.firebaseapp.com",
  projectId: "to-do-live-f044a",
  storageBucket: "to-do-live-f044a.appspot.com",
  messagingSenderId: "96383649884",
  appId: "1:96383649884:web:d7c4810cc1c58e738f7e99",
  measurementId: "G-VYS5VR6YRW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
