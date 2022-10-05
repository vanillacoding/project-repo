import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import ScheduleListEntry from "./ScheduleListEntry";

const Wrapper = styled.div`
  width: calc(100% - 350px);
  min-width: 1200px;
  position: relative;
`;

const List = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.color.white};
  display: flex;
`;

const Error = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ScheduleList({ schedule, error }) {
  return (
    <Wrapper>
      <h2 className="english-title">TODAY GAMES</h2>
      <List>
        {error
          ? <Error>{error}</Error>
          : (Array.isArray(schedule)
            && schedule.map((game, index) => (
              <ScheduleListEntry
                key={index}
                homeTeam={game.home}
                homePitcher={game.homePitcher}
                awayTeam={game.away}
                awayPitcher={game.awayPitcher}
                time={game.time}
              />
            ))
          )}
      </List>
    </Wrapper>
  );
}

ScheduleList.propTypes = {
  schedule: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object).isRequired,
  ]).isRequired,
  error: PropTypes.string,
};

ScheduleList.defaultProps = {
  error: null,
};

export default ScheduleList;
