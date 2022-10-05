import styled from 'styled-components';

export const Modal = {};


Modal.Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all .3s ease-in-out .3s;
  overflow: hidden;
  outline: 0;
  z-index: 5;
`;

Modal.Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  z-index: 2;
`;

Modal.Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  min-width: 500px;
  min-height: 500px;
  max-width: 100%;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  outline: 0;
  padding: 2rem;
`;

Modal.Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
`;
