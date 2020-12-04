//Handle Account Status
import { auth } from '../firebase/config.js';
auth.onAuthStateChanged(user => {
  if(!user) {
    window.location = '../login/login.html'; //If User is not logged in, redirect to login page
  }
});



const signout = document.querySelector('.logout');
signout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    window.location.replace('../index.html');
  })
});