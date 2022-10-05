import styled from "styled-components";

const DetailWrapper = styled.div`
  display: flex;
  max-height: 90%;
  max-width: 90%;
  flex-flow: row wrap;
  align-items: center;
  margin: 10px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.background.input};
  border: 3px solid ${({ theme }) => theme.background.main};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.main};

  .viewer {
    display: grid;
    width: 680px;
    justify-items: center;
  }

  .comment {
    display: flex;
    margin: auto;
    justify-content: center;
  }

  .card-area {
    cursor: pointer;
  }

  @media screen and (max-width: 1380px) {
    width: 700px;
    height: calc(100% - 120px);
    overflow-y: auto;

    .viewer {
      width: calc(100% - 20px);
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 720px) {
    width: calc(100% - 20px);

    .comment {
      width: calc(100% - 20px);
    }
  }
`;

export default DetailWrapper;
