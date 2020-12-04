import { db, storage } from '../../firebase/config.js';
const blogList = document.querySelector('#blog-list')
// create element and render cafe
function renderCafe(doc){
  let li = document.createElement('li');
  let title = document.createElement('h3');
  let  file= document.createElement('img');
  let body = document.createElement('p');
  let cross = document.createElement('div');
  let edit = document.createElement('a');

  
  li.setAttribute('data-id',doc.id);
  title.textContent = doc.data().title;
  file.setAttribute('src', doc.data().image);
  //file.classList.add("Images")
  body.textContent = doc.data().body;
  cross.textContent = 'Delete';
  edit.textContent = 'Edit';
  edit.setAttribute('href','../edit/index.html?id=' + doc.id)
  

  li.appendChild(title);
  li.appendChild(file);
  li.appendChild(body);
  li.appendChild(cross);
  li.appendChild(edit);
  

  blogList.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('article').doc(id).delete();
  })
 }

 db.collection('post').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {
      renderCafe(doc);
  })
});

const form = document.querySelector('#add-blog-form');
//saving data
form.addEventListener('submit',(e) => {

  e.preventDefault();
  const file = document.querySelector('#photo').files[0];
  console.log(file);
  const img = storage.ref("image/" + file.name)
  img.put(file).then(() => {
    console.log("upload success")
    img.getDownloadURL().then( (url) =>{
      console.log(url)
      db.collection('post').add({
      title:form.title.value,
      image:url,
      body:form.body.value
  }).then(() =>{
      form.title.value = '';
      form.image.value = '';
      form.body.value = '';
  })
    })
  })
})




