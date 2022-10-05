const User = require('../../../models/User');
const Report = require('../../../models/Report');
const Template = require('../../../models/Template');
const AWS = require('aws-sdk');
const sendMessage = require('../../../constants/sendMessages');
require('dotenv').config();

exports.getOne = (req, res) => {
  res.json({
    message: sendMessage.USER_FOUND,
    userData: res.locals.userData
  });
};

exports.getOneByEmail = async(req, res, next) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({
        message: sendMessage.USER_NOT_FOUND,
        userData: null
      });
    }

    res.json({
      message: sendMessage.USER_FOUND,
      userData: {
        _id: user._id,
        name: user.name,
        profilePhoto: user.profile_photo
      }
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.getAllReports = async(req, res, next) => {
  try {
    const reports = await Report
      .find({ created_by: req.params.user_id })
      .sort({ created_at: 'desc' });

    res.json({
      message: sendMessage.REPORTS_LOADED,
      reports: reports
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.getPaginationReports = async(req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.page_number);
    const pageSize =  parseInt(req.query.page_size);
    const skipPage = parseInt(req.query.skip_page);

    const reports = await Report
      .find({ created_by: req.params.user_id })
      .sort({ created_at: 'desc' })
      .skip((pageNumber - 1) * pageSize + skipPage)
      .limit(pageSize);

    if (!reports.length) {
      return res.json({
        message: sendMessage.REPORT_NOT_FOUND,
        reports: []
      });
    }

    res.json({
      message: sendMessage.REPORTS_LOADED,
      reports: reports
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.getPaginationRequests = async(req, res, next) => {
  try {
    const pageNumber = parseInt(req.query.page_number);
    const pageSize =  parseInt(req.query.page_size);

    const user = await User
      .findById(req.params.user_id)
      .populate('approval_requests')
      .slice('approval_requests', [(pageNumber - 1) * pageSize, pageSize]);

    res.json({
      message: 'success',
      reports: user.approval_requests
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.getUserTemplates = async(req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id }).populate('templates');

    res.json({
      message: sendMessage.USER_TEMPLATES_LOADED,
      templates: user.templates
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.create = async(req, res, next) => {
  try {
    const userId = req.params.user_id;
    const { title, text, templateId, date } = req.body;

    const type = 'jpg';
    const buffer = req.files.photo[0].buffer;

    const s3 = new AWS.S3({
      accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `photos/${userId}_${date}`,
      Body: buffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        throw new Error('s3 upload failed');
      }
      const photoUrl = data.Location;
      saveReport(photoUrl);
    });

    const saveReport = async(photoUrl) => {
      const newReport = await new Report({
        created_by: userId,
        title: title,
        body: text,
        url: photoUrl,
        template_id: templateId
      }).save();

      await User.updateOne(
        {
          _id: userId
        },
        {
          $addToSet: { reports : newReport._id },
          $inc: { points: 5 }
        }
      );

      res.json({
        message: sendMessage.REPORT_UPLOADED,
        newReport: newReport
      });
    };
  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.addTemplate = async(req, res, next) => {
  try {
    const userId = req.params.user_id;
    const { templateId, price } = req.body;
    await User.updateOne(
      {
        _id: userId
      },
      {
        $addToSet: { templates : templateId },
        $inc: { points: -price }
      }
    );

    const newTemplate = await Template.findById(templateId);

    res.json({
      message: sendMessage.TEMPLATE_ADDED,
      newTemplate: newTemplate
    });
  } catch(err) {
    console.log(err);
    next(new Error(err));
  }
};

exports.requestApproval = async(req, res, next) => {
  try {
    const { user_id: userId, report_id: reportId } = req.params;

    await User.updateOne(
      {
        _id: userId
      },
      {
        $addToSet: {
          approval_requests : reportId
        }
      }
    );

    await Report.updateOne(
      {
        _id: reportId,
        'approvals.approved_by': { $nin: userId },
      },
      {
        $push: {
          approvals: {
            approved_by: userId,
            approved: false
          }
        }
      },
      {
        new: true
      }
    );

    res.json({
      message: sendMessage.APPROVAL_REQUESTED
    });
  } catch(err) {
    next(new Error(err));
    console.log(err);
  }
};

exports.confirmApproval = async(req, res, next) => {
  try {
    const { user_id: userId, report_id: reportId } = req.params;
    await Report.updateOne(
      {
        _id: reportId,
        'approvals.approved_by': userId
      },
      {
        $set: {
          'approvals.$.approved' : true
        }
      }
    );

    res.json({
      message: sendMessage.APPROVAL_CONFIRMED
    });
  } catch(err) {
    next(new Error(err));
  }
};

exports.delete = async(req, res, next) => {
  try {
    const { report_id: reportId } = req.params;
    await Report.findOneAndRemove({ _id: reportId });
    await User.updateMany({}, {
      $pull: {
        reports: {
          $in: reportId
        },
        approval_requests: {
          $in: reportId
        }
      }
    });

    res.json({
      message: sendMessage.REPORT_DELETED
    });
  } catch(err) {
    next(new Error(err));
  }
};
