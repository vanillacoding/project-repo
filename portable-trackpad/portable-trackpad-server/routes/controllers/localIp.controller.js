const findLocalIpAddress = require("local-devices");

exports.getLocalIps = async (req, res, next) => {
  try {
    const localIpAddress = await findLocalIpAddress({
      skipNameResolution: true,
    });

    res.json({ localIpAddress });
  } catch (error) {
    next(error);
  }
};
