const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getFirebaseDB = async () => {
  const movieRef = db.collection('movies');
  const snapshot = await movieRef.get();
  if (snapshot.empty) {
    console.log('No documents.');
    return;
  }  

  let movieList =[];
  snapshot.forEach(doc => {
    const movieItem = ({
      id: doc.id,
      ...doc.data()
    });
    movieList.push(movieItem)
  })
  return movieList
}

module.exports = {
    getFirebaseDB
}
