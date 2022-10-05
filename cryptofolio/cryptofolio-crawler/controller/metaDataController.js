const { metadataCrawler } = require("../crawler/metadataCrawler");
const MetaData = require("../models/metadataModel");

exports.getMetadata = async (req, res, next) => {
  try {
    console.log("MetaData");
    await MetaData.deleteMany();
    const crawledMetadata = await metadataCrawler();

    const savedMetadata = await MetaData.create(crawledMetadata);

    if (!savedMetadata) {
      return res.status(400).json({
        message: "fail",
      });
    }

    console.log(savedMetadata);

    return res.status(200).json({
      message: "success",
      data: savedMetadata,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
