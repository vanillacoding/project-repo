import styled from 'styled-components';

export const IslandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 480px;
  height: 300px;
  border-radius: .5em;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    text-align: center;
    margin-block-start: 0;
  }
`;
