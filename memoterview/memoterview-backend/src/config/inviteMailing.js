function makeInviteMailText(link) {
  return `당신을 면접에 초대합니다 ${link} 로 접속해주십시오.`;
}

const subject = "[Memoterview] 당신을 면접에 초대합니다.";

module.exports = {
  subject,
  makeInviteMailText,
};
