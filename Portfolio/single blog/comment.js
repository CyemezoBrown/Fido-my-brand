import { db } from '../../firebase/config.js';
  console.log(firebase)
  const commentList = document.querySelector('#comment-list');
  const form1 = document.querySelector('#add-comment-form');


  // create element and render comment
  function renderComment(doc){
    let li = document.createElement('li');
    let username = document.createElement('span');
    let email = document.createElement('span');
    let comment= document.createElement('span');
    let cross = document.createElement('div')
    
  
    li.setAttribute('data-id',doc.id);
    username.textContent = (doc.data().username);
    email.textContent = (doc.data().email);
    comment.textContent = (doc.data().comment);
    cross.textContent = 'X';
    
  
    li.appendChild(username);
    li.appendChild(email);
    li.appendChild(comment);
    li.appendChild(cross);
  
    commentList.appendChild(li);
  
      //deleting data
      cross.addEventListener('click',(e) =>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('comment').doc(id).delete();
    })
  };
   // Getting Data
  db.collection('comment').get().then((snapshot) => {
    //console.log("Document successfully written!")
    //console.log(doc.data())
    snapshot.docs.forEach(doc => {
        renderComment(doc);
    })
  });
   
    // Saving data
  form1.addEventListener('submit', (e) => {
      e.preventDefault();
      db.collection('comment').add({
          username: form1.username.value,
          email: form1.email.value,
          comment: form1.comment.value
      });
      form1.username.value = '';
      form1.email.value = '';
      form1.comment.value = '';
  })
  