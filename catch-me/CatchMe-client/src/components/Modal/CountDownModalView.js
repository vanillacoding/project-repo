import React from "react";

import ModalView from "../shared/ModalView";
import ContentLayout from "../shared/ContentLayout";
import GameMessage from "../shared/GameMessage";

const CountDownModalView = ({ leftTime }) => {
  return (
    <ModalView width={800} height={500} color="rgba(0, 0, 0, 0.3)">
      <ContentLayout>
        <GameMessage>
          {leftTime}
        </GameMessage>
      </ContentLayout>
    </ModalView>
  );
};

export default CountDownModalView;
