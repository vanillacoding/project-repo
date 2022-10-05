import styled from 'styled-components';

export const MainHeaderWrapper = styled.header`
  position: fixed;
  min-width: 576px;
  width: 100%;
  top: 0;
  left: 0;
  height: 75px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);

  section {
    text-align: center;
    display: grid;
    grid-template-columns: 10em 10em 1fr 10em;
    padding: 1em 0;
    margin-right: 5em;
  }
`;

export const Wrapper = styled.div`
  margin: 0 2em;
`;

export const Form = styled.form`
  width: 50em;
  display: grid;
  grid-template-columns: 20fr 1fr;
  border-bottom: 1px solid black;
  margin-left: 15em;
`;
