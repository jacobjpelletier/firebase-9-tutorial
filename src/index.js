import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, query,
    where,
    orderBy, serverTimestamp,
    getDoc, updateDoc

    // add realtime listener
} from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'


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
const auth = getAuth()

// collection ref
const collRef = collection(db, 'books')

const q1 = query(collRef, where("author", "==", "mr hanky"))

const q2 = query(collRef, where("author", "==", "mr hanky"), orderBy('title', 'asc'))

const q3 = query(collRef, orderBy('createdAt'))


// realtime data collection
onSnapshot(q3, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
    })
    console.log(books)
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
        createdAt: serverTimestamp()
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

// update documents
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value);
    
    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })
})

// getting a single document
const docRef = doc(db, 'books', 'RaKYvyxFkYptcUPOjAIT')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// singing up users
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log(`user created:`, cred.user)
        })
        .catch((err) => {
            console.log(err.message)
        })

})

// login and logout
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            //console.log('the user signed out');
        })
        .catch((err) => {
            console.log(err.message);
        })
})

const loginform = document.querySelector('.login');
loginform.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginform.email.value;
    const password = loginform.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //console.log('user logged in:', cred.user)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

//onauthstate change
onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user)
})