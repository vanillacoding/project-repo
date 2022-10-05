const admin = require("firebase-admin");

const {
  firebaseDatabaseURL,
  firebaseType,
  fireebaseProjectId,
  firebasePrivateKeyId,
  firebasePrivateKey,
  firebaseClientEmail,
  firebaseClientId,
  firebaseAuthUrl,
  firebaseTokenUrl,
  firebaseAuthProviderX509CertUrl,
  firebaseClientX509CertUrl,
} = require("./");

const serviceAccount = {
  type: firebaseType,
  project_id: fireebaseProjectId,
  private_key_id: firebasePrivateKeyId,
  private_key: firebasePrivateKey,
  client_email: firebaseClientEmail,
  client_id: firebaseClientId,
  auth_uri: firebaseAuthUrl,
  token_uri: firebaseTokenUrl,
  auth_provider_x509_cert_url: firebaseAuthProviderX509CertUrl,
  client_x509_cert_url: firebaseClientX509CertUrl,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseDatabaseURL,
});

const authenticateUser = async (idToken) => {
  const { name, email, picture, uid } = await admin
    .auth()
    .verifyIdToken(idToken);

  return { name, email, picture, uid };
};

exports.authenticateUser = authenticateUser;
