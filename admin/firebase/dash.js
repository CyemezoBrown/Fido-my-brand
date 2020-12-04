const blogList = document.querySelector('#blog-list');
const form = document.querySelector('#add-blog-form');



 // create element and render list
 function renderBlog(doc){
     let li = document.createElement('li');
     let sn = document.createElement('span');
     let title = document.createElement('span');
     let body = document.createElement('span');

     li.setAttribute('data-id', doc.id);
     sn.textContent = doc.data().sn;
     title.textContent = doc.data().title;
     body.textContent = doc.data().body;

     li.appendChild(sn);
     li.appendChild(title);
     li.appendChild(name);

     blogList.appendChild(li);
 }
  // Getting Data
db.collection('article').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderBlog(doc);
    })
});

  // Saving Data
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      db.collection('article').add({
          title: form.title.value,
          body: form.body.value
      });
      form.body.value = '';
      form.title.value = '';
  })