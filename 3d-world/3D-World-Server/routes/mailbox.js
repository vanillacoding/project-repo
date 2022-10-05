const router = require("express").Router();

const mailboxControllers = require("../controllers/mailbox.controller");
const deserialize = require("../middlewares/deserialize");

router.get("/", deserialize, mailboxControllers.getMailList);
router.delete("/", deserialize, mailboxControllers.deleteMailList);

router.patch("/read", deserialize, mailboxControllers.readMail);

router.post("/mail/:id", deserialize, mailboxControllers.postMail);
router.delete("/mail/:id", deserialize, mailboxControllers.deleteMail);

module.exports = router;
