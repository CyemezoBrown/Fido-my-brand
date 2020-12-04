import {db} from '../../firebase/config.js';

var query = window.location.search.substring(1);
var vars = query.split("=");
var blogId = vars[1];
console.log("Blog id", blogId);
var editForm = document.querySelector("#edit-blog-form");
db.collection("post")
  .doc(blogId)
  .get()
  .then((res) => {
    console.log("Blog data for id", blogId, res.data());
    var edit = res.data();
  console.log("=======>","editForm");
    editForm.title.value = edit.title;
    editForm.body.value = edit.body;
  });
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("post")
    .doc(blogId)
    .update({
      title: editForm.title.value,
      body: editForm.body.value,
    })
    .then(() => {
     editForm.reset();
    //  window.location.href = "../post/index.html";
    }).catch((error)=>{
      console.log('============>',error);
    });
});



// const form = document.querySelector('.edit-blog-form');
// //const ref = firebase.storage().ref();


// let imageLink;
// const coverImage = document.querySelector('.cover-image==')
//  coverImage.addEventListener('change',function(){
//    const file =coverImage.files[0]
//    const name = file.name
  
//    const metadata = {
//      contentType:file.type 
//    }

//    const task = ref.child(name).put(file,metadata)
//      task.then(snapshot => snapshot.ref.getDownloadURL())
//      .then(url =>{
//        imageLink = url
//      })
//  })

// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const articleId = urlParams.get('id')
// let currentImage = '';
// db.collection('posts').get().then((snapshot) =>{
//     snapshot.docs.forEach(doc => {
//         if (articleId == doc.id) {
//             const articleData = doc.data();
//             form.title.value = articleData.title;
//             form.description.value = articleData.description;
//             form.body.value = articleData.body;
//             currentImage = articleData.coverImage
//         }
//     })
// });

// // saving data
// form.addEventListener('submit',(e) => {
//     e.preventDefault();
//     const image = imageLink ? imageLink : currentImage;
//     db.collection('posts').doc(articleId).update({
//         body: form.body.value,
//         description: form.description.value,
//         title: form.title.value,
//         coverImage: image
//     });
// })
