import styled from "styled-components";

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 50%;
  padding-top: 100%;
  margin-bottom: 10%;

  img, .graph {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 90%;
    border-radius: 50%;
    object-fit: fill;
  }
`;

export default ProfileImageWrapper;
