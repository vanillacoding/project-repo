import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';

dotenv.config();

export const checkIsExist = (arr, target) => (
  !!arr.filter((ele) => {
    if (typeof ele !== 'string') {
      return ele.toString() === target;
    }

    return ele === target;
  }).length
);

const options = {
  auth: {
    api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_PASSWORD
  }
};

const client = nodemailer.createTransport(sgTransport(options));
const inviteEmailCreator = (memberEmail, teamName, token) => {
  const VERIFY_REQUEST_URL = `https://www.where-is-kim.site/#/verify/${token}`;

  return {
    from: 'inyeop0212@gmail.com',
    to: `${memberEmail}`,
    subject: `[김대리 어딨어] ${teamName} 초대 메일 🧚‍♀️`,
    html: '<div style="width: 100%;max-width: 50%;margin: auto;">'
           + `<h1>[김대리 어딨어] ${teamName} 초대 메일</h1>`
             + '<div style="background-color:#fff;border: 1px solid #eee;padding: 15px;">'
               + '<h2>팀에 합류하기 위해 아래 버튼을 클릭하세요!</h2>'
               + '<p style="margin-bottom:30px;">해당 링크는 48시간만 유효합니다. 시간이 지나면 해당 주소는 유효하지 않습니다.</p>'
               + `<a href="${VERIFY_REQUEST_URL}/" style="background-color: #4cd3c2;`
                 + 'text-decoration: none;'
                 + 'color: #fff;'
                 + 'display:inline-block;'
                 + 'padding: 0 15px;'
                 + 'line-height: 40px;'
                 + 'border-radius: 5px;font-weight: bold;"'
               + '>'
                 + '참여하기'
               + '</a>'
             + '</div>'
          + '</div>'
  };
};

export const sendMail = (memberEmail, teamName, token) => {
  const email = inviteEmailCreator(memberEmail, teamName, token);
  return client.sendMail(email);
};
