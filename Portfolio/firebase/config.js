var firebaseConfig = {
    apiKey: "AIzaSyCd0SDkzrLmf7M0azo_Y64T_Pn_TK_PfrU",
    authDomain: "portfolio-865cb.firebaseapp.com",
    databaseURL: "https://portfolio-865cb.firebaseio.com",
    projectId: "portfolio-865cb",
    storageBucket: "portfolio-865cb.appspot.com",
    messagingSenderId: "841068769692",
    appId: "1:841068769692:web:dbea85e0b11f299f279859",
    measurementId: "G-PB839QKKFZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();

   export {db, storage, auth };
