import React from "react";
import styled from "styled-components";

import ModalBackground from "../../publicComponents/ModalBackground/ModalBackground";

const ChannelListGuideContainer = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;

  .enter-room-guide {
    position: fixed;
    width: 25%;
    top: 17%;
    left: 4%;
    border-bottom: 1px solid #ffffff;
  }

  .create-room-guide {
    position: fixed;
    width: 26%;
    top: 16%;
    right: 3%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }

  .actived-room-guide {
    position: fixed;
    width: 28%;
    top: 50%;
    right: 1%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }
`;

function ChannelListGuide() {
  return (
    <ModalBackground>
      <ChannelListGuideContainer>
        <span className="enter-room-guide">
          받은 키를 작성해서 우측의 버튼을 눌러 입장합니다.
        </span>
        <span className="create-room-guide">
          방 제목을 입력 후 버튼을 눌러 새로운 방을 생성합니다.
        </span>
        <span className="actived-room-guide">
          활성화된 방이 있는 경우 카드 형식으로 방이 생성됩니다.<br />
          카드를 클릭하면 해당 방에 입장합니다.
        </span>
      </ChannelListGuideContainer>
    </ModalBackground>
  );
}

export default React.memo(ChannelListGuide);
