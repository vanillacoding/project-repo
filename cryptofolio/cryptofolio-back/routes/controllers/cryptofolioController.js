const Cryptofolio = require("../../models/cryptofolioModel");
const User = require("../../models/userModel");

exports.getCryptoFoliosDB = async (req, res, next) => {
  try {
    const cryptofolios = await Cryptofolio.find().populate("createdBy").lean();

    return res.status(200).json({
      message: "success",
      data: cryptofolios,
    });
  } catch (err) {
    next(err);
  }
};

exports.createCryptoFolioDB = async (req, res, next) => {
  try {
    const savedCryptofolio = await Cryptofolio.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(req.body.createdBy, {
      $addToSet: { cryptofolios: savedCryptofolio._id },
    });

    if (!savedCryptofolio || !updatedUser) {
      return res.status(400).json({
        message: "fail",
      });
    }

    return res.status(200).json({
      message: "success",
      data: savedCryptofolio,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteCryptoFolioDB = async (req, res, next) => {
  try {
    const { userId, cryptoFolioId } = req.body;
    const deletedCryptofolio = await Cryptofolio.findByIdAndDelete(
      cryptoFolioId
    );
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { cryptofolios: cryptoFolioId },
    });

    if (!deletedCryptofolio || !updatedUser) {
      return res.status(400).json({
        message: "fail",
      });
    }

    return res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
