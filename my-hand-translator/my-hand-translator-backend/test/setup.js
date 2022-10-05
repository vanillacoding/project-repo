const sinon = require("sinon");
const auth = require("../middlewares/auth/verifyIdToken");

sinon.stub(auth, "verifyIdToken").callsFake((req, res, next) => {
  return next();
});
