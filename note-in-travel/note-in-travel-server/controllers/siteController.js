const Site = require("../models/Site");
const catchAsync = require("../utils/catchAsync");

exports.addSite = catchAsync(async (req, res, next) => {
  const site = req.body;

  let newSite = await Site.findOne({ fullName: site.fullName });

  if (!newSite) {
    newSite = await Site.create(site);
  }

  res.json({
    ok: true,
    data: newSite,
  });
});
