import styled from "styled-components";

const VideoContentTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 3em;
  padding: 0.1rem 0.3em;
  background: #1E1E1E90;
  color: rgba(255, 255, 255);
  position: absolute;
  bottom: 0%;
  left: 0;
  font-weight: bold;
  border-radius: 3px;
  border: 2px solid ${({ color }) => color};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 2;
  text-align: center;
`;

export default VideoContentTag;
