const fetch = require("node-fetch");
const MetaData = require("../../models/metadataModel");
const Coin = require("../../models/coinModel");

exports.getDataDB = async (req, res, next) => {
  try {
    const coinDB = await Coin.find().populate("createdBy").lean();
    const metadata = await MetaData.find().lean();
    const coinData = {};

    coinDB.forEach((coin) => {
      coinData[coin.ticker] = coin;
    });

    const data = {
      metadata: Array.from(metadata)[0],
      coinData,
    };

    return res.status(200).json({
      message: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMetaDataDB = async (req, res, next) => {
  try {
    const response = await fetch(`${process.env.CRAWL_SERVER_URL}/metadata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 0,
    });

    const result = await response.json();

    if (!result) {
      return res.status(200).json({
        message: "fail",
        data: {
          errMessage: "업데이트에 실패했습니다.",
        },
      });
    }

    return res.status(200).json({
      message: "success",
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePriceDB = async (req, res, next) => {
  try {
    const response = await fetch(`${process.env.CRAWL_SERVER_URL}/price`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 0,
    });

    const result = await response.json();

    if (!result) {
      return res.status(200).json({
        message: "fail",
        data: {
          errMessage: "업데이트에 실패했습니다.",
        },
      });
    }

    return res.status(200).json({
      message: "success",
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};
