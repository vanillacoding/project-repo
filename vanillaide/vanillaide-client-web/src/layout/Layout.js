import PropTypes from "prop-types";
import styled from "styled-components";

export default function Layout({ innerHeight, children }) {
  return (
    <Container width={window.innerWidth} height={innerHeight}>
      {children}
    </Container>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  innerHeight: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  user-select: none;
`;
