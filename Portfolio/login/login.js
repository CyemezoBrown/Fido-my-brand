// login

import { auth } from '../firebase/config.js';

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
  e.preventDefault();


  const email = loginForm['email'].value;
  const password=loginForm['password'].value;

  auth.signInWithEmailAndPassword(email,password).then(cred =>{
     //loginForm.reset();
     console.log('right here')
      window.location.replace('../admin/index.html');

  })
})
//Handle Account Status
// auth.onAuthStateChanged(user => {
//   if(!user) {
//     console.log('you have logout');
//     window.location = 'login.html'; //If User is not logged in, redirect to login page
    
//   }
// });

