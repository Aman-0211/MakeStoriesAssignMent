import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBs9ZJkEMp-dqlCxjIJBnmrjbvc8wKOl1o",
  authDomain: "makestories-12f16.firebaseapp.com",
  databaseURL: "https://makestories-12f16.firebaseio.com",
  projectId: "makestories-12f16",
  storageBucket: "makestories-12f16.appspot.com",
  messagingSenderId: "161143021007",
  appId: "1:161143021007:web:4ceb5b8247613ef64846ba",
  measurementId: "G-MMK41YP3RR",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();
// firebase.analytics();

export { storage, firebase as default };
