import { useEffect, useState } from "react";
import styled from "styled-components";
import flexCenter from "../../styles/mixins/flexCenter";

const Wrapper = styled.div<{ center: boolean }>`
  ${flexCenter}
  position: relative;
  font-family: Montserrat;
  width: 200px;
  height: 50px;
  background-color: white;
  font-size: 20px;
  font-weight: 200;
  background: ${({ theme }) => theme.gradient.gray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  ${({ center }) => center && "transform: translate(-50%, -50%)"};
`;

const TIME_INTERVAL = 350;
const INITIAL_LOADING_MESSAGE = "Loading";

interface LoadingProps {
  center?: boolean;
}

export default function Loading({ center = false }: LoadingProps) {
  const [message, setMessage] = useState(INITIAL_LOADING_MESSAGE);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setMessage((prevMessage) => {
        if (prevMessage === `${INITIAL_LOADING_MESSAGE}...`) {
          return INITIAL_LOADING_MESSAGE;
        }

        return `${prevMessage}.`;
      });
    }, TIME_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper center={center}>
      <div>{message}</div>
    </Wrapper>
  );
}

Loading.defaultProps = {
  center: false,
};
