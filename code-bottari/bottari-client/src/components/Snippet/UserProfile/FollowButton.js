import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const buildStyle = ({
  border,
  backgroundColor,
}) => css`
  border: ${border};
  background-color: ${backgroundColor};
`;

const MarkType = {
  default: {
    border: "1px solid #999090",
    backgroundColor: "#999090",
  },
  following: {
    border: "1px solid #F9675D",
    backgroundColor: "#F9675D",
  },
};

const FollowerType = {
  default: {
    border: "1px solid #999090",
  },
  following: {
    border: "1px solid #F9675D",
  },
};

const StyledFollowButton = styled.button`
  display: flex;
  padding: 0px;
  border: none;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
`;

const StyledFollowMark = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 19px;
  padding-left: 2px;
  border-radius: 5px 0px 0px 5px;

  ${({ variant }) => buildStyle(MarkType[variant])}
`;

const StyledFollower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 51px;
  height: 19px;
  border-radius: 0px 5px 5px 0px;

  ${({ variant }) => buildStyle(FollowerType[variant])}
`;

const Mark = styled.img`
  width: 15px;
  height: 15px;
`;

export default function FollowButton({ variant, count, onClick }) {
  const handleFollowing = () => onClick();

  return (
    <StyledFollowButton variant={variant} onClick={handleFollowing}>
      <StyledFollowMark variant={variant}>
        <Mark src="/images/followMark.png" alt="구독 마크" />
      </StyledFollowMark>
      <StyledFollower variant={variant}>
        {count}
      </StyledFollower>
    </StyledFollowButton>
  );
};

FollowButton.propTypes = {
  variant: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

FollowButton.defaultProps = {
  onClick: () => {},
};
