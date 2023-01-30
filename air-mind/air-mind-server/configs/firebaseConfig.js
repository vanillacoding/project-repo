const admin = require('firebase-admin');

// const serviceAccount = require('./serviceAccountKey.json');
const serviceAccount = {
  type: process.env.FIREBASE_SERVICE_KEY_TYPE,
  project_id: process.env.FIREBASE_SERVICE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_SERVICE_PROJECT_KEY_ID,
  private_key: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_SERVICE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_SERVICE_AUTH_URI,
  token_uri: process.env.FIREBASE_SERVICE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.FIREBASE_SERVICE_CLIENT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
