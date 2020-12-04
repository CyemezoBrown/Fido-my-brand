
import { db, storage } from '../../firebase/config.js';
const blogList = document.querySelector('#blog-list')
// create element and render cafe
function renderCafe(doc){
  let li = document.createElement('li');
  let title = document.createElement('h3');
  let  file= document.createElement('img');
  let description = document.createElement('p');
  let cross = document.createElement('div');
  //let edit = document.createElement('');

  
  li.setAttribute('data-id',doc.id);
  title.textContent = doc.data().title;
  file.setAttribute('src', doc.data().image);
  //file.classList.add("Images")
  description.textContent = doc.data().description;
  cross.textContent = 'Delete';
  //edit.textContent = '';

  li.appendChild(title);
  li.appendChild(file);
  li.appendChild(description);
  li.appendChild(cross);
 // li.appendChild(edit);

  blogList.appendChild(li);


  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('article').doc(id).delete();
  })
 }

db.collection('article').get().then((snapshot) =>{
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
  const img = storage.ref("images/" + file.name)
  img.put(file).then(() => {
    console.log("upload success")
    img.getDownloadURL().then( (url) =>{
      console.log(url)
      db.collection('article').add({
      title:form.title.value,
      image:url,
      description:form.description.value
  }).then(() =>{
      form.title.value = '';
      form.image.value = '';
      form.description.value = '';
  })
    })
  })
})


