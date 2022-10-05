import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const size = css`
  ${(props) => css`
    width: ${props.size}px;
    height: ${props.size}px;
  `}
`;

const borderRadius = css`
  ${(props) => css`
    border-radius: ${props.borderRadius};
  `}
`;

// NOTE: 필요하다면 함수형 컴포넌트로 구조 변경해야 할 수도
// TODO: 스타일 작업
const Photo = styled.img`
  ${size}
  ${borderRadius}
  max-width: 250px;
`;

Photo.propTypes = {
  size: PropTypes.number,
  borderRadius: PropTypes.string,
};

Photo.defaultProps = {
  size: 40,
  borderRadius: "0.3rem",
};

export default Photo;
