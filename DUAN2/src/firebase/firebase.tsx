// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3oXptlp9p3BKKhIM8rRw2nnEQWXFRKcY",
    authDomain: "my-project-1597069232155.firebaseapp.com",
    projectId: "my-project-1597069232155",
    storageBucket: "my-project-1597069232155.appspot.com",
    messagingSenderId: "881433021035",
    appId: "1:881433021035:web:42ae932677dc3f9671bf2e",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
