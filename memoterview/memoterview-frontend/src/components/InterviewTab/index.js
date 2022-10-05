import styled from "styled-components";

import TabButton from "../TabButton";

const TabWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5em;
  position: relative;

  .tab-content {
    max-height: 60vh;
    background: white;
    border-radius: ${props => props.isLeft ? "0 0 3px 0" : "0 0 0 3px"};
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    overflow-y: scroll;
  }

  .pdf {
    max-height: 80vh;
  }
`;

export default function InterviewTab({
  tabName,
  tabIcon,
  onClick,
  children,
  isOpened,
  isLeft,
}) {
  return (
    <TabWrapper isLeft={isLeft}>
      {isLeft ? (
        <>
          {isOpened && <div className="tab-content">{children}</div>}
          <TabButton
            isLeft={isLeft}
            borderRadius="0 5px 5px 0"
            name={tabName}
            icon={tabIcon}
            onClick={onClick}
          />
        </>
      ) : (
        <>
          <TabButton
            isLeft={isLeft}
            borderRadius="5px 0 0 5px"
            name={tabName}
            icon={tabIcon}
            onClick={onClick}
          />
          {isOpened && <div className="tab-content pdf">{children}</div>}
        </>
      )}
    </TabWrapper>
  );
}
