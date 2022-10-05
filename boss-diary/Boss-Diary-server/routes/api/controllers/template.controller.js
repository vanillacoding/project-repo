const Template = require('../../../models/Template');
const sendMessage = require('../../../constants/sendMessages');

exports.getAll = async(req, res, next) => {
  try {
    const templates = await Template.find();

    res.json({
      message: sendMessage.TEMPLATES_LOADED,
      templates: templates
    });

  } catch(err) {
    next(new Error(err));
  }
};
