const createError = require("http-errors");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const Fuse = require("fuse.js");

const {
  BUCKET,
  ACL,
  CONTENT_ENCODING,
  CONTENT_TYPE,
} = require("../../../constants/awsParams");

const User = require("../../../models/User");
const Beer = require("../../../models/Beer");
const Review = require("../../../models/Review");

const sortBeersByEuclideanDistance = require("../../../utils/sortBeersByEuclideanDistance");
const callGoogleVisionAsync = require("../../../utils/callGoogleVisionAsync");
const leanQueryByOptions = require("../../../utils/leanQueryByOptions");
const {
  validateQuery,
  validateBase64,
} = require("../../../utils/validationHandler");

const getBeerRankings = async (req, res, next) => {
  const { error } = validateQuery(req.query);

  if (error) {
    return next(createError(404, error));
  }

  const limitBy = req.query.limit ?? 10;

  try {
    const beerRanking = await leanQueryByOptions(Beer.find());
    beerRanking.sort((a, b) => {
      let difference = b.averageRating - a.averageRating;

      if (difference === 0) {
        difference = b.reviewCounts - a.reviewCounts;
      }

      return difference;
    });

    return res.json(beerRanking.slice(0, limitBy));
  } catch (err) {
    next(createError(500, err));
  }
};

const searchBeer = async (req, res, next) => {
  const { error } = validateQuery(req.query);

  if (error) {
    return next(createError(404, error));
  }

  const text = req.query.text;

  if (text.replace(/\s/g, "").length === 0) {
    return res.json([]);
  }

  try {
    const beers = await Beer.find().lean();
    const fuse = new Fuse(beers, { keys: ["name"] });
    let searched = fuse.search(text).map((el) => el.item);
    searched = searched.length > 5 ? searched.slice(0, 5) : searched;

    return res.json(searched);
  } catch (err) {
    next(createError(500, err));
  }
};

const getBeer = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const beer = await leanQueryByOptions(Beer.findById(beerId));

    return res.json(beer);
  } catch (err) {
    next(createError(500, err));
  }
};

const scanPhoto = async (req, res, next) => {
  const { error } = validateBase64(req.body.base64);

  if (error) {
    return next(createError(400, error));
  }

  try {
    const { id } = res.locals.user;
    const buffer = new Buffer.from(req.body.base64, "base64");
    const detectedBeerText = await callGoogleVisionAsync(req.body.base64);

    if (!detectedBeerText.length) {
      return res.json({
        status: "Analyze Failure",
        payload: {},
      });
    }

    const detectedBeerTexts = detectedBeerText.split("\n");
    const flatBeerTexts = detectedBeerTexts
      .map((string) => {
        const beerText = string.toLowerCase().replace(/\s+/g, "");

        if (beerText.length > 2) {
          return beerText;
        }
      })
      .filter(Boolean);

    if (!flatBeerTexts.length) {
      return res.json({
        status: "Analyze Failure",
        payload: {},
      });
    }

    const beers = await Beer.find().select("name");
    const beerInfo = beers.find((beer) => {
      return flatBeerTexts.some((text) => {
        return beer.name.toLowerCase().startsWith(text);
      });
    });

    if (beerInfo) {
      const params = {
        Bucket: `${BUCKET}`,
        Key: `${id}/${new Date().toISOString()}`,
        Body: buffer,
        ACL,
        ContentEncoding: CONTENT_ENCODING,
        ContentType: CONTENT_TYPE,
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          throw new Error("s3 upload failed");
        }

        try {
          await User.findByIdAndUpdate(
            id,
            {
              $push: {
                beers: {
                  beer: beerInfo._id,
                  myBeerImageURL: data.Location,
                },
              },
            },
            { runValidators: true }
          );
        } catch (err) {
          next(createError(500, err));
        }
      });
    }

    return res.json({
      status: beerInfo ? "Analyze Success" : "Analyze Failure",
      payload: beerInfo?._id,
    });
  } catch (err) {
    next(createError(500, err));
  }
};

const getBeerComments = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const comments = await Review.getComments(beerId, false)
      .sort("createdAt")
      .lean();

    return res.json(comments);
  } catch (err) {
    next(createError(500, err));
  }
};

const getBeerRecommendations = async (req, res, next) => {
  try {
    const { beerId } = req.params;
    const beers = await leanQueryByOptions(Beer.find());
    const baseBeerIndex = beers.findIndex(
      (beer) => beer._id.toString() === beerId
    );
    const recommendations = sortBeersByEuclideanDistance(
      beers[baseBeerIndex],
      beers
    ).slice(1, 6);

    return res.json(recommendations);
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = {
  searchBeer,
  getBeerRankings,
  getBeer,
  getBeerComments,
  getBeerRecommendations,
  scanPhoto,
};
