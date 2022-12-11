import firebase from 'firebase/app';
import 'firebase/firestore';
 
// if (firebase.apps.length === 0) {
const firebaseConfig = {
    apiKey: "AIzaSyBrcpF9VkloaVySuHQxpzjf22Wy-Wgx1YE",
    authDomain: "fir-demo-ba443.firebaseapp.com",
    databaseURL: "https://fir-demo-ba443-default-rtdb.firebaseio.com",
    projectId: "fir-demo-ba443",
    storageBucket: "fir-demo-ba443.appspot.com",
    messagingSenderId: "739695130615",
    appId: "1:739695130615:web:3b5002890888858e54a0f2",
    measurementId: "G-ZJ7GNHM732"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db=firebase.firestore();
db.settings({timestampsInSnapshots:true});

export default db;