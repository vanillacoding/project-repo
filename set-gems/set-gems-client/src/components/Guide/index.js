import React, { useState } from "react";

import "./Guide.css";
import Card from "../Card";
import Tutorial from "../Tutorial";
import CARD_PROPERTY_KOR from "../../constants/koCardProperty";
import { GEM_COLOR, GEM_SHAPE, METAL_COLOR, METAL_SHAPE } from "../../constants/cardProperty";

function Guide() {
  const [isTutorial, setIsTutorial] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("gemColor");

  const handleTutorialButton = function () {
    setIsTutorial((prev) => !prev);
  };

  const tutorialButton = (
    <button onClick={handleTutorialButton}>
      {isTutorial ? "가이드로 돌아가기" : "카드 조합 해보기"}
    </button>
  );

  const propertyExample = [...Array(3)].map((_, i) => {
    const cardProps = {
      gemColor: Object.values(GEM_COLOR)[selectedProperty === "gemColor" ? i : 0],
      gemShape: Object.values(GEM_SHAPE)[selectedProperty === "gemShape" ? i : 0],
      metalColor: Object.values(METAL_COLOR)[selectedProperty === "metalColor" ? i : 0],
      metalShape: Object.values(METAL_SHAPE)[selectedProperty === "metalShape" ? i : 0],
    };

    return (
      <div className="example-card" key={JSON.stringify(cardProps)} >
        <p>{CARD_PROPERTY_KOR[cardProps[selectedProperty]]}</p>
        <Card state="" {...cardProps} />
      </div>
    );
  });

  const handleSelectProperty = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div className="guide">
      {isTutorial
        ? <div>
          {tutorialButton}
          <Tutorial />
        </div>
        : <div>
          <p>SET GEMS는 카드들의 공통점과 차이점을 이용해 조합을 만들어 카드를 수집하는 게임입니다.</p>
          <h2>게임 모드 별 규칙</h2>
          <ul>
            <li>혼자하기 모드에서는 자유롭게 카드를 선택할 수 있습니다</li>
            <li>같이하기 모드에서는 SET버튼을 누른 플레이어만 5초 동안 카드를 선택할 수 있습니다</li>
          </ul>
          <h2>공통 규칙</h2>
          <ul>
            <li>카드에는 4가지 속성을 모두 포함하는 그림이 그려져 있습니다.</li>
            <li>각 속성에는 세 가지 값이 있습니다.
              <div className="property-info">
                <div className="example">
                  {propertyExample}
                </div>
                <div className="properties">
                  <span
                    className={selectedProperty === "gemColor" ? "selected" : ""}
                    onClick={handleSelectProperty.bind(null, "gemColor")}
                  >
                    보석의 종류
                  </span>
                  <span
                    className={selectedProperty === "gemShape" ? "selected" : ""}
                    onClick={handleSelectProperty.bind(null, "gemShape")}
                  >
                    보석의 모양
                  </span>
                  <span
                    className={selectedProperty === "metalColor" ? "selected" : ""}
                    onClick={handleSelectProperty.bind(null, "metalColor")}
                  >
                    금속의 종류
                  </span>
                  <span
                    className={selectedProperty === "metalShape" ? "selected" : ""}
                    onClick={handleSelectProperty.bind(null, "metalShape")}
                  >
                    금속의 모양
                  </span>
                </div>
              </div>
            </li>
            <li>
              조합은 속성의 값이 전부 다른 값을 갖거나 같은 값을 가진 3장의 카드로 이루어집니다.
              <ul>
                <li>세 장의 카드에 그려진 <strong>보석의 종류</strong>가 모두 같거나 달라야합니다.</li>
                <li>세 장의 카드에 그려진 <strong>보석의 모양</strong>이 모두 같거나 달라야합니다.</li>
                <li>세 장의 카드에 그려진 <strong>금속의 종류</strong>가 모두 같거나 달라야합니다.</li>
                <li>세 장의 카드에 그려진 <strong>금속의 모양</strong>이 모두 같거나 달라야합니다.</li>
              </ul>
            </li>
            <li>위 네 가지 조건을 모두 만족해야 조합이 됩니다.</li>
            <li><strong>예를 들어, 두 장의 카드만 루비이고 한 장은 에메랄드라면 조합이 아닙니다!</strong></li>
          </ul>
          {tutorialButton}
        </div>}
    </div>
  );
}

export default Guide;
