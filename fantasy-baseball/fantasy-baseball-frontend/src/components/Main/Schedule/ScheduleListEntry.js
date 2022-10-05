import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import Logo from "../../Shared/Logo";

const Entry = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::after {
    width: 1px;
    height: 140px;
    margin: -70px 0 0 0;
    background: ${({ theme }) => theme.color.lightgrey};
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    content: "";
  }
`;

const Team = styled.div`
  padding: 0 ${({ theme }) => theme.margin.base};
  text-align: center;
`;

const TeamName = styled.p`
  margin: ${({ theme }) => theme.margin.small};
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const Pitcher = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
`;

const Info = styled.div`
  width: 40px;
  text-align: center;
`;

const Versus = styled.p`
  font-size: ${({ theme }) => theme.fontSize.bigger};
  color: ${({ theme }) => theme.color.lightgrey};
`;

const Time = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
`;

function ScheduleListEntry(props) {
  const {
    homeTeam,
    homePitcher,
    awayTeam,
    awayPitcher,
    time,
  } = props;

  return (
    <Entry>
      <Team>
        <Logo
          teamName={homeTeam}
          height="50px"
        />
        <TeamName>{homeTeam}</TeamName>
        <Pitcher>{homePitcher}</Pitcher>
      </Team>
      <Info>
        <Versus>VS</Versus>
        <Time>{time}</Time>
      </Info>
      <Team>
        <Logo
          teamName={awayTeam}
          height="50px"
        />
        <TeamName>{awayTeam}</TeamName>
        <Pitcher>{awayPitcher}</Pitcher>
      </Team>
    </Entry>
  );
}

ScheduleListEntry.propTypes = {
  homeTeam: PropTypes.string.isRequired,
  homePitcher: PropTypes.string.isRequired,
  awayTeam: PropTypes.string.isRequired,
  awayPitcher: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ScheduleListEntry;
