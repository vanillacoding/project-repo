const nodemailer = require("nodemailer");

const { NODE_MAILER_ID, NODE_MAILER_PASSWORD } = require('../config');

const sendMail = async (sender, receiver, roomLink, groupId) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    service: 'Naver',
    auth: {
      user: NODE_MAILER_ID,
      pass: NODE_MAILER_PASSWORD
    }
  });
  console.log("$$$$", receiver);

  const mailOptions = {
    from: NODE_MAILER_ID,
    to: receiver,
    subject: `${sender}님께서 No Face Time으로 초대합니다!`,
    html: `<p>${sender}님께서 초대 링크를 보내셨습니다.</p>
          <p>아래 링크를 클릭하시면 No Face Time으로 이동합니다!</p>
          <a href=${roomLink}>이동하기</a>  `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
};

//sendMail().catch(console.error);

module.exports = sendMail;
