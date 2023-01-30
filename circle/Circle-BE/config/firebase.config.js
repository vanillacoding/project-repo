const admin = require("firebase-admin");

const FIREBASE_APP_CREDENTIAL = require("./secret/firebaseAppCredential.json");

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_APP_CREDENTIAL),
});

exports.admin = admin;
