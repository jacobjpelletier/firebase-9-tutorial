import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// connects front end to firebase backend
const firebaseConfig = {
    apiKey: "AIzaSyDLyBwQ4M9I4oIg05hdx52B5OuvhC1VSBI",
    authDomain: "fir-9-tutorial-b0325.firebaseapp.com",
    projectId: "fir-9-tutorial-b0325",
    storageBucket: "fir-9-tutorial-b0325.appspot.com",
    messagingSenderId: "691680920020",
    appId: "1:691680920020:web:9bb992641b05c9f8729641",
    measurementId: "G-59EX377EFS"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const collRef = collection(db, 'books')

// get collection data, returns a promise
getDocs(collRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

//adding documents
// store add form
const addBookForm = document.querySelector('.add');
// event listener
addBookForm.addEventListener('submit', (e) => {
    // prevent reloading
    e.preventDefault()

    addDoc(collRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value);

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})


