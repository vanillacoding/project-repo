import React from "react";
import { Link } from "react-router-dom";
import { GiMushroomHouse } from "react-icons/gi";
import styled from "styled-components";
import PropTypes from "prop-types";

import mainIcon from "../../../../assets/images/mainIcon.png";
import route from "../../../../constants/routes";

const ChannelStyle = styled.div`
  position: relative;
  width: 90%;
  min-height: 15%;
  margin: 0.5em;
  border-radius: 8px;
  background: #ffffff;
  background-image: url(${(props) => props.mainIcon});
  background-position: -10% 60%;
  background-size: 250px;
  background-repeat: no-repeat;
  font-weight: bold;
  color: #000000;
  box-shadow: 0px 8px 12px 0px rgba(255, 255, 255, 0.3);
  transition: all .5s ease-in-out;

  .channel-icon {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #ffffff;
    border: 3px solid #ffd700;
    border-radius: 50%;
  }

  .channel-info {
    display: block;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, #ffffff -3%, gold);
    border-radius: 8px;
    float: right;
  }

  .enter-button {
    width: 10em;
    height: 2em;
    line-height: 2em;
    margin: 1em;
    background: #ffffff;
    border: 2px solid #ffffff;
    border-radius: 3px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    color: #000000;
    float: right;
    cursor: pointer;
    transition: all .5s ease-in-out;
  }

  .enter-button:hover {
    background: #000000;
    border: 2px solid #000000;
    color: #ffffff;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

function Channel({ roomInfo, roomId }) {
  const { roomTitle, owner } = roomInfo;

  return (
    <ChannelStyle mainIcon={mainIcon}>
      <GiMushroomHouse className="channel-icon" size={30} />
      <div className="channel-info">
        <span>{roomTitle}</span>
        <br />
        <span>owner: {owner.email}</span>
        <Link
          to={{
            pathname: `${route.MAIN}/${roomId}`,
            state: { authRouting: true }
          }}
          className="enter-button"
        >
          입장하기
        </Link>
      </div>
    </ChannelStyle>
  );
}

Channel.propTypes = {
  roomInfo: PropTypes.shape({
    roomTitle: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      email: PropTypes.string.isRequired,
      socketId: PropTypes.string.isRequired
    })
  }),
  roomId: PropTypes.string.isRequired
};

export default Channel;
