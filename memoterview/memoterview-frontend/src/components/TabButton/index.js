import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TabButtonWrapper = styled.div`
  width: 1.2em;
  max-height: 8.5em;
  color: ${({ theme }) => theme.Arsenic};
  z-index: 2;
  background: white;
  margin-bottom: 0.6em;
  padding: 0.3rem 0;
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props => props.isLeft ? "10px 15px 12px -5px rgba(0, 0, 0, 0.22)" : "-10px 15px 12px -5px rgba(0, 0, 0, 0.22)"};
  cursor: pointer;

  :hover {
    color: white;
    background: #10AC84;
    border: 1px solid white;
  }

  .icon {
    font-size: 1em;
    margin-left: 0.2em;
    margin-bottom: 0.3em;
  }

  .icon-name {
    font-size: 0.8em;
    font-weight: bold;
    writing-mode: vertical-rl;
    line-height: 1.5;
    letter-spacing: 0.05em;
  }
`;

export default function TabButton({ isLeft, borderRadius, icon, onClick, name }) {
  return (
    <TabButtonWrapper isLeft={isLeft} borderRadius={borderRadius} onClick={onClick}>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="icon-name">
        {name}
      </div>
    </TabButtonWrapper>
  );
}
