import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  min-width: 1000px;
  width: 100%;
  top: 0;
  left: 0;
  height: 75px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-left: ${({ direction }) => direction === 'left' ? 'none' : '40px solid black'};
  border-right: ${({ direction }) => direction === 'left' ? '40px solid black' : 'none'};

  &:hover {
    cursor: pointer;
  }
`;

export const Blank = styled.div`
  width: 15px;
`;

export const ArrowsWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
`;

export const ArrowWrapper = styled.div`
  width: 52px;
`;

export const LeftWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  width: 330px;
  justify-content: space-around;
  align-items: center;
`;

export const RightWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  width: 180px;
  justify-content: space-around;
  align-items: center;
`;

export const DeleteButtonWrapper = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
`;

export const ShareButtonWrapper = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
`;

export const SaveButtonWrapper = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
`;

export const ShowChangesButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModifyRecordWrapper = styled.div`
  position: absolute;
  left: 360px;
`;

export const ModalContentWrapper = styled.div`
  width: 50em;
  height: 23em;
  display: grid;
  grid-template-rows: 2em 2em 1fr;
`;

export const StyledForm = styled.form`
  padding: 0 2em;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 1em;
  align-items: center;
`;

export const SharedUserListWrapper = styled.div`
  padding: 0 2em;
  display: grid;
  grid-template-rows: 3em 1fr;
  grid-gap: 1em;
`;

export const SharedListHeader = styled.div`
  font-size: 1.2em;
  padding-top: 0.8em;
`;

export const SharedUserListMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PermissionUpdateForm = styled.form`
  font-size: large;
  display: grid;
  grid-template-columns: 4fr 2fr 2fr;
  grid-auto-flow: column;
  grid-gap: 1em;
  align-items: center;
  justify-content: space-between;
`;
