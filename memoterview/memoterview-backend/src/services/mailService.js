const nodemailer = require("nodemailer");

const mailConstant = require("../config/inviteMailing");
const {
  mailing: { gmail },
} = require("../config");

exports.sendInviteEmail = async ({ welcomePageLink, userEmail }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", //사용하고자 하는 서비스
    prot: 587,
    host: "smtp.gmlail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: gmail.user, //gmail주소입력
      pass: gmail.password, //gmail패스워드 입력
    },
  });

  return await transporter.sendMail({
    from: gmail.user, //보내는 주소 입력
    to: userEmail, //위에서 선언해준 받는사람 이메일
    subject: mailConstant.subject, //메일 제목
    text: mailConstant.makeInviteMailText(welcomePageLink), //내용
  });
};
