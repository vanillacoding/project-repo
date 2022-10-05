import { useEffect } from "react";

import rabbit from "../../public/enemy.png"

const useKakao = () => {
  useEffect(() => {
    Kakao.init(process.env.KAKAO_KEY);

    return () => {
      Kakao.cleanup();
    };
  }, []);
 
  const handleMessageSend = (invitationCode) => {
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "Don't Catch Me!",
        description: "친구가 당신을 초대했어요! 링크를 눌러 접속해주세요!",
        link: {
          webUrl: `${process.env.PORT}/waiting/${invitationCode}`,
        },
        imageUrl: rabbit,
      },
      buttons: [
        {
          title: "게임 참여하기",
          link: {
            webUrl: `${process.env.PORT}/waiting/${invitationCode}`,
          }
        }
      ]
    });
  };

  return { handleMessageSend };
};

export default useKakao;
