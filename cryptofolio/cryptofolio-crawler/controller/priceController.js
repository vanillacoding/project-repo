const { priceCrawler } = require("../crawler/priceCrawler");

exports.getPriceData = async (req, res, next) => {
  try {
    console.log("Price");
    const crawledPricedata = await priceCrawler();

    if (!crawledPricedata) {
      return res.status(400).json({
        message: "fail",
      });
    }

    return res.status(200).json({
      message: "success",
      data: crawledPricedata,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
