import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Title from "./shared/Title";
import SelectMaker from "./shared/SelectMaker";
import TasteMusicInfo from "./TasteMusicInfo";
import TasteD3 from "./TasteD3";

import { title, dateType } from "../constants";
import makeYearRange from "../utils/makeYearRange";
import useMusicClassification from "../hooks/useMusicClassification";

const Wrapper = styled.div`
  .selects {
    background-color:  ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: right;
    width: 30rem;
    margin-left: 3rem;
    padding: 2rem;
    color: ${({ theme }) => theme.colors.indigo};
    border-radius: 0.2rem;
  }

  .inner-selects {
    margin-top: 3rem;
  }

  .type-month {
    display: flex;
  }
`;

const dateTypes = [dateType.year, dateType.month];
const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const TasteMusic = ({ createdAt, likeMusic }) => {
  const {
    classificatedData,
    type,
    year,
    month,
    setType,
    setYear,
    setMonth,
    handleExit,
  } = useMusicClassification(likeMusic);

  const years = makeYearRange(createdAt);
  const infoData = classificatedData.filter(genre => genre.percentage);

  return (
    <Wrapper>
      <Title title={title.tasteMusic} />
      {!classificatedData.length && <div className="selects" >
        <SelectMaker name={"type"} options={dateTypes} setValue={setType} />
        {!!type && <div className="inner-selects">
          {type === dateType.year && <SelectMaker name={"year"} options={years} setValue={setYear} />}
          {type === dateType.month && <div className="type-month">
            <SelectMaker name={"year"} options={years} setValue={setYear} />
            <SelectMaker name={"month"} options={months} setValue={setMonth} />
          </div>}
        </div>}
      </div>}
      {!!classificatedData.length && <div>
        <TasteD3
          tasteData={classificatedData}
          handleClick={handleExit}
        />
        <TasteMusicInfo
          year={year}
          month={month}
          infoData={infoData}
        />
      </div>}
    </Wrapper>
  );
};

TasteMusic.propTypes = {
  createdAt: PropTypes.string.isRequired,
  likeMusic: PropTypes.arrayOf(PropTypes.shape({
    genreId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })).isRequired,
};

export default TasteMusic;
