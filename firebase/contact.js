import { db } from '../../firebase/config.js';
  console.log(firebase)
  const contactList = document.querySelector('#contact-list');
  const form1 = document.querySelector('.contact-form');


  // create element and render comment
function renderComment(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let email = document.createElement('span');
  let message = document.createElement('span');
  let cross = document.createElement('div')
  

  li.setAttribute('data-id',doc.id);
  name.textContent = (doc.data().name);
  email.textContent = (doc.data().email);
  message.textContent = (doc.data().message);
  cross.textContent = 'X';
  

  li.appendChild(name);
  li.appendChild(email);
  li.appendChild(message);
  li.appendChild(cross);

  contactList.appendChild(li);

    //deleting data
    cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('contact').doc(id).delete();
  })
   };
 // Getting Data
db.collection('contact').get().then((snapshot) => {
  //console.log("Document successfully written!")
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {
      renderComment(doc);
  })
});
 
  // Saving data
form1.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('contact').add({
        name: form1.name.value,
        email: form1.email.value,
        message: form1.message.value
    });
    form1.name.value = '';
    form1.email.value = '';
    form1.message.value = '';
})
