const mongoose = require("mongoose");

const Mailbox = require("../models/Mailbox");
const User = require("../models/User");
const Room = require("../models/Room");
const {
  createRequestError,
  createAuthenticationError,
  createNotFoundError,
} = require("../utils/errors");

async function getMailList(req, res, next) {
  const { _id } = req.user;

  try {
    const mailboxData = await Room.findOne({ ownerId: _id }, "mailboxId")
      .populate("mailboxId");

    res.json({
      ok: true,
      data: mailboxData.mailboxId,
    });
  } catch (err) {
    console.log("💥 getMailList");
    next(err);
  }
}

async function postMail(req, res, next) {
  const { _id: sender, name } = req.user;
  const { content } = req.body;
  const { id } = req.params;

  if (!(mongoose.Types.ObjectId.isValid(id))) {
    next(createRequestError());
    return;
  }

  try {
    const addEmail = { $push: { mails: { content, sender, name } } };
    const mailbox = await Mailbox.findByIdAndUpdate(id, addEmail, { new: true });

    if (!mailbox) {
      next(createNotFoundError("Mailbox is not exist.."));
      return;
    }

    res.json({
      ok: true,
      data: mailbox,
    });
  } catch (err) {
    console.log("💥 postMail");
    next(err);
  }
}

async function readMail(req, res, next) {
  const { mailId } = req.body;

  if (!(mongoose.Types.ObjectId.isValid(mailId))) {
    next(createRequestError());
    return;
  }

  try {
    const mailbox = await Mailbox.findOneAndUpdate(
      { "mails._id": mailId },
      { $set: { "mails.$.status": "READ" } },
      { new: true },
    );

    res.json({
      ok: true,
      data: mailbox,
    });
  } catch (err) {
    console.log("💥 readMail");
    next(err);
  }
}

async function deleteMail(req, res, next) {
  const { id } = req.params;

  if (!(mongoose.Types.ObjectId.isValid(id))) {
    next(createRequestError());
    return;
  }

  try {
    const deleteResult = await Mailbox.updateOne(
      { "mails._id": id },
      { $pull: { mails: { _id: id } } },
    );

    if (!deleteResult.nModified) {
      next(createRequestError());
    }

    res.json({
      ok: true,
      data: id,
    });
  } catch (err) {
    console.log("💥 deleteMail");
    next(err);
  }
}

async function deleteMailList(req, res, next) {
  const { _id } = req.user;

  try {
    const mailboxData = await Room.findOne({ ownerId: _id }, "mailboxId");
    const { mailboxId } = mailboxData;

    const initializeMails = { $set: { mails: [] } };
    const deleteMailResult = await Mailbox.findByIdAndUpdate(
      mailboxId,
      initializeMails,
      { new: true },
    );

    if (!deleteMailResult) {
      next(createNotFoundError("Mailbox is not exist.."));
      return;
    }

    res.json({
      ok: true,
      data: deleteMailResult,
    });
  } catch (err) {
    console.log("💥 deleteMailList");
    next(err);
  }
}

exports.getMailList = getMailList;
exports.postMail = postMail;
exports.readMail = readMail;
exports.deleteMail = deleteMail;
exports.deleteMailList = deleteMailList;
