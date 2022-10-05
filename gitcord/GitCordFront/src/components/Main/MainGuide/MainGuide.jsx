import React from "react";
import styled from "styled-components";

import ModalBackground from "../../publicComponents/ModalBackground/ModalBackground";

const MainGuideContainer = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;

  .back-button-guide {
    position: fixed;
    width: 19%;
    top: 10%;
    left: 4%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .title-guide {
    position: fixed;
    width: 10%;
    top: 6%;
    left: 13%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .toggle-guide {
    position: fixed;
    width: 25%;
    top: 1%;
    right: 30%;
    border-bottom: 1px solid #ffffff;
  }

  .share-button-guide {
    position: fixed;
    width: 22%;
    top: 7%;
    right: 1%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .user-list-guide {
    position: fixed;
    width: 20%;
    top: 20%;
    left: 17%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }

  .editor-guide {
    position: fixed;
    width: 20%;
    bottom: 20%;
    left: 50%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }

  .chat-guide {
    position: fixed;
    width: 22%;
    bottom: 40%;
    right: 17%;
    border-bottom: 1px solid #ffffff;
    text-align: left;
  }

  .save-guide {
    position: fixed;
    width: 25%;
    bottom: 13%;
    left: 14%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }

  .documents-guide {
    position: fixed;
    width: 26%;
    bottom: 2%;
    left: 9%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .private-editor-guide {
    position: fixed;
    width: 35%;
    bottom: 2%;
    left: 53%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }
`;

function MainGuide() {
  return (
    <ModalBackground>
      <MainGuideContainer>
        <span className="back-button-guide">
          채널 페이지로 이동하는 버튼입니다.
        </span>
        <span className="title-guide">
          방 제목입니다.
        </span>
        <span className="toggle-guide">
          코드 에디터와 화이트 보드의 토글 버튼입니다.<br />
          클릭 시 에디터 모드가 변경됩니다.
        </span>
        <span className="share-button-guide">
          공유하기 버튼입니다.<br />
          누르신 후 나오는 모달의 복사하기 아이콘을 누르세요.
        </span>
        <span className="user-list-guide">
          입장한 유저들의 리스트입니다.
        </span>
        <span className="editor-guide">
          코드를 작성하는 에디터입니다.<br />
          입장한 유저들 모두 사용 가능합니다.
        </span>
        <span className="chat-guide">
          채팅창입니다.<br />
          채팅을 입력하시면 위 채팅창에 올라갑니다.
        </span>
        <span className="save-guide">
          저장하기 버튼입니다.<br />
          현재 작업한 코드 에디터 내용을 저장할 수 있습니다.
        </span>
        <span className="documents-guide">
          내 저장 문서들을 불러오는 버튼입니다.<br />
          문서를 클릭하면 현재 에디터에 내용이 적용됩니다.
        </span>
        <span className="private-editor-guide">
          나의 개인 에디터 화면을 보여주는 버튼입니다.<br />
          해당 에디터에서 작성하는 내용은 다른 참여자들에게 보여지지 않습니다.
        </span>
      </MainGuideContainer>
    </ModalBackground>
  );
}

export default React.memo(MainGuide);
