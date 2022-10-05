import styled from 'styled-components';

export const MainBodyWrapper = styled.div`
  margin-top: 6em;
  display: grid;
  grid-template-rows: 3.3em 2.5em 4em;
  justify-content: center;
`;

export const NoteListHeaderWrapper = styled.div`
  width: 80%;
  height: 2em;
  margin: 0 5em;
  padding: 0 3em;
  font-size: 1em;
  text-align: center;
  border-bottom: 1px solid black;

  section {
    display: grid;
    grid-template-columns: 2em 1fr 1fr 15em 5em;
    grid-gap: 1em;
    align-items: center;
    padding: 0 2em;
  }
`;

export const NoteListEntryWrapper = styled.div`
  margin-top: 1em;
  height: 3em;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 15em 5em;
  grid-gap: 1em;
  align-items: center;
  border: 2.5px solid #f08080;
  border-radius: 1em;
  padding: 0 2em;
`;

export const NoteListWrapper = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 5em;
  padding: 1em 3em;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
