const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");
const Beer = require("../../../models/Beer");

const sortBeersByEuclideanDistance = require("../../../utils/sortBeersByEuclideanDistance");
const getidToken = require("../../../utils/getIdToken");
const leanQueryByOptions = require("../../../utils/leanQueryByOptions");
const { validateToken } = require("../../../utils/validationHandler");
const { authenticateUser } = require("../../../config/auth");
const { appPrivateKey } = require("../../../config");

const signInUser = async (req, res, next) => {
  const authorization = req.get("authorization");
  let userName, userEmail, userProfileImagePath, uid;

  if (authorization?.startsWith("Bearer ")) {
    try {
      const idTokenByGoogle = getidToken(authorization);
      const { error } = validateToken(idTokenByGoogle);

      if (error) {
        return next(createError(401, error));
      }

      const userData = await authenticateUser(idTokenByGoogle);
      userName = userData.name;
      userEmail = userData.email;
      userProfileImagePath = userData.picture;
      uid = userData.uid;
    } catch (err) {
      return next(createError(401, err));
    }

    try {
      const user = await leanQueryByOptions(
        User.findOneAndUpdate(
          { email: userEmail },
          {
            name: userName,
            imagePath: userProfileImagePath,
            $addToSet: { uids: uid },
            $setOnInsert: {
              reviewCounts: 0,
              totalRating: 0,
              totalBody: 0,
              totalAroma: 0,
              totalSparkling: 0,
              beers: [],
            },
          },
          { runValidators: true, upsert: true, new: true }
        )
      );

      const appIdToken = jwt.sign(user._id.toString(), appPrivateKey);

      return res.json({ user, appIdToken });
    } catch (err) {
      next(createError(500, err));
    }
  } else {
    return next(createError(401));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await leanQueryByOptions(User.findById(userId));

    return res.json(user);
  } catch (err) {
    next(createError(500, err));
  }
};

const getUserRecommendations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await leanQueryByOptions(User.findById(userId));
    const beers = await leanQueryByOptions(Beer.find());
    const recommendations = sortBeersByEuclideanDistance(user, beers).slice(
      0,
      5
    );

    return res.json(recommendations);
  } catch (err) {
    next(createError(500, err));
  }
};

module.exports = { signInUser, getUser, getUserRecommendations };
