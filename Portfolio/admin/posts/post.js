const blogList = document.querySelector('#blog-list');
const form = document.querySelector('#add-blog-form');
//const auth = firebase.auth


/* console.log(firebase)
function uploadImage(){
  const file = document.querySelector('#photo').files[0]
  const name = new Date() + '-' + file.name
  const metadata = {
    contentType:file.contentType
  }
  const task = ref.child(name).put(file,metadata)

  task
  .then(snapshot => snapshot.ref.getDownloadURL())
  .then(url => {
    console.log(url)
    alert("Upload Successful")
    const image = document.querySelector('#image')
    image.src = url
  })

}*/

/* let imageLink;
const coverImage = document.querySelector('.cover-image')
 coverImage.addEventListener('change',function(){
   const file =coverImage.files[0];
   const name = file.name;
  
   const metadata = {
     contentType:file.type

   }

   const task = ref.child(name).put(file,metadata)
     task.then(snapshot => snapshot.ref.getDownloadURL())
     .then(url =>{
         console.log(url)
         alert("Image upload successful")
         const photo = document.querySelector('#photo')
         photo.src = url;
      // imageLink = url;
     });
 });*/

 
// create element and render posts

function renderPost(doc){
  let li = document.createElement('li');
  let title = document.createElement('span');
  let description = document.createElement('span');
  let body = document.createElement('span');
  let cross = document.createElement('div');
  let edit = document.createElement('a');

  li.setAttribute('data-id',doc.id);
  title.textContent = doc.data().title
  body.textContent = doc.data().body;
  description.textContent = doc.data().description;
  cross.textContent = 'x';
  edit.textContent = 'edit';
  edit.setAttribute('href','index.html?id=' + doc.id)

  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(description);
  li.appendChild(cross);
  li.appendChild(edit);

  blogList.appendChild(li);

  //deleting data
  cross.addEventListener('click',(e) =>{
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      db.collection('post').doc(id).delete();
  })
}

db.collection('post').get().then((snapshot) =>{
  //console.log(doc.data())
  snapshot.docs.forEach(doc => {
      renderPost(doc);
  })
});

// saving data
form.addEventListener('submit',(e) => {
  e.preventDefault();
  db.collection('post').add({
      coverImage:image,
      title:form.title.value,
      description:form.description.value,
      body:form.body.value

  });
  form.coverImage.value = '';
  form.title.value = '';
  form.description.value = '';
  form.body.value = '';
})

