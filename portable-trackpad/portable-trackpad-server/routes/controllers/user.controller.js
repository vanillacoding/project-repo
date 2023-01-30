const User = require("../../models/User");
const nodemailer = require("nodemailer");

exports.getGesture = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ gesture: user.gesture });
  } catch (error) {
    next(error);
  }
};

exports.getRecentPc = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ recentPc: user.pc });
  } catch (error) {
    next(error);
  }
};

exports.updateRecentPc = async (req, res, next) => {
  const email = req.params.users_id;
  const recentPc = req.body.recentPc;
  const lastAccessDate = new Date();

  try {
    const user = await User.findOne({ email });

    return await User.updateOne(
      { email },
      {
        name: user.name,
        email: user.email,
        gesture: user.gesture,
        customGesture: user.customGesture,
        pc: {
          name: recentPc.name,
          ipAddress: recentPc.ipAddress,
          lastAccessDate,
        },
      },
    );
  } catch (error) {
    next(error);
  }
};

exports.postEmail = async (req, res, next) => {
  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.MAILS_EMAIL,
      pass: process.env.MAILS_PWD,
    },
    secure: true,
  });

  const htmlContent = `
    <h1>Hello User!</h1>
    <p>
      <h2>아래의 링크를 통해 Package파일을 다운로드 받을 수 있습니다.</h2>
      <a href="https://drive.google.com/file/d/1T7-AoPHIjv_yW8r1dTUA-gSS13OnfqbQ/view?usp=sharing">Package파일 다운로드<a>
    </p>
  `;

  const mailOption = {
    from: process.env.MAILS_EMAIL,
    to: email,
    subject: "Portable TrackPad Desktop Application Download",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOption);

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.updateGestures = async (req, res, next) => {
  const email = req.params.users_id;
  const { gesture } = req.body.updatedGesture;

  try {
    await User.findOneAndUpdate({ email }, { gesture });

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.updateCustomGesture = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    const customGesture = {
      path: req.body?.path ? req.body?.path : user.customGesture.path,
      function: req.body?.function
        ? req.body?.function
        : user.customGesture.function,
    };

    await User.updateOne({ email }, { customGesture });

    res.json({ result: "success" });
  } catch (error) {
    next(error);
  }
};

exports.getCustomGesture = async (req, res, next) => {
  const email = req.params.users_id;

  try {
    const user = await User.findOne({ email });

    res.json({ customGesture: user.customGesture });
  } catch (error) {
    next(error);
  }
};
