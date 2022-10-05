import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Container = styled.div`
  font-size: 0.7em;
`;

function StarScore({ recycleScore }) {
  const scoreList = [1, 2, 3, 4, 5];

  return (
    <Container>
      평점: {recycleScore}
      (
      {scoreList.map((score) => (
        <FontAwesomeIcon
          key={score}
          icon={faStar}
          color={score <= recycleScore ? "#3DD97E" : "#A69E9E"}
        />
      ))}
      )
    </Container>
  );
}

export default StarScore;
