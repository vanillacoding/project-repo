import React, { useState, useRef } from "react";

import { faExternalLinkAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import produce from "immer";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PLAYER_POSITIONS } from "../../constants";
import { formatDate, subDate } from "../../utils/date";
import Button from "../Shared/Button";
import LinkButton from "../Shared/LinkButton";
import Table from "../Shared/Table";

const Wrapper = styled.article`
  padding: 0 0 ${({ theme }) => theme.padding.base} 0;
`;

const PlayerLink = styled.a`
  color: ${({ theme }) => theme.color.white};
`;

const ButtonList = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  gap: 0.5rem;

  & > * {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AddIcon = styled.span`
  color: ${({ theme }) => theme.color.grey};
  cursor: pointer;

  &[data-active="true"],
  &.selected {
    color: ${({ theme }) => theme.color.white};
  }
`;

function SearchEntry({ players, setRoaster }) {
  const [iconCount, setIconCount] = useState(0);
  const [isSearched, setIsSearched] = useState(false);
  const tableRowData = useRef();

  const removeSelectedPlayers = (list, position) => {
    const iconList = list;

    const selectedDataIndex = iconList.findIndex((icon) => (
      (PLAYER_POSITIONS[icon.values.add.position] === position
        && icon.values.add.isActive)
    ));

    if (selectedDataIndex > -1) {
      iconList[selectedDataIndex].values.add.isActive = false;
    }
  };

  const getLatestDate = () => {
    const latestDate = subDate(new Date(), 1);

    if (latestDate.getDay() === 1) return subDate(new Date(), 2);

    return latestDate;
  };

  const handleAddIcon = (tableProps, event) => {
    const currentData = tableProps.value;
    const currentIcon = event.currentTarget;
    const kboId = currentIcon.getAttribute("data-kbo-id");
    const position = currentIcon.getAttribute("data-position");
    const { isActive } = currentData;
    const selectedPlayer = players.find((player) => player.kboId === kboId);

    setIconCount((prev) => {
      const newCount = prev + 1;
      return newCount;
    });

    if (kboId === selectedPlayer.kboId && isActive) {
      setRoaster(
        produce((draft) => {
          draft[position] = { name: null };
        })
      );
      currentData.isActive = false;
      return;
    }

    const iconList = tableProps.rows;

    removeSelectedPlayers(iconList, position);

    currentData.isActive = true;

    setRoaster(
      produce((draft) => {
        draft[position] = selectedPlayer;
      })
    );
  };

  const renderLinkIcon = ({ value }) => (
    <PlayerLink href={value} target="_blank">
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </PlayerLink>
  );

  const renderAddIcon = (tableProps) => {
    const position = PLAYER_POSITIONS[tableProps.value.position];
    tableRowData.current = tableProps.rows;

    return (
      <AddIcon
        data-kbo-id={tableProps.value.kboId}
        data-active={tableProps.value.isActive}
        data-position={position}
        onClick={(event) => handleAddIcon(tableProps, event)}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </AddIcon>
    );
  };

  const BETTING_COLUMNS = [
    {
      Header: "name",
      accessor: "name"
    },
    {
      Header: "team",
      accessor: "team"
    },
    {
      Header: "position",
      accessor: "position",
    },
    {
      Header: "info",
      accessor: "link",
      Cell: renderLinkIcon,
    },
    {
      Header: "add",
      accessor: (row) => ({
        kboId: row.kboId,
        position: row.position,
        isActive: false,
      }),
      Cell: renderAddIcon,
    },
  ];

  const generatorRandomRoaster = (tableRow) => {
    const iconList = tableRow;
    const sortedPlayers = players.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 0;
    });

    for (let i = 0; i < 10; i += 1) {
      const randomNumber = Math.floor(Math.random() * 10).toString();
      const playerNumber = Number(i + randomNumber);
      const randomPlayer = sortedPlayers[playerNumber];
      const position = PLAYER_POSITIONS[randomPlayer.position];

      const playerIndex = iconList.findIndex((icon) => (
        icon.values.add.kboId === randomPlayer.kboId
      ));

      removeSelectedPlayers(iconList, position);

      if (iconList[playerIndex].values.add.isActive === false) {
        iconList[playerIndex].values.add.isActive = true;
        setIconCount((prev) => {
          const newCount = prev + 1;
          return newCount;
        });
      }

      setRoaster(
        produce((draft) => {
          draft[position] = randomPlayer;
        })
      );
    }
  };

  return (
    <Wrapper>
      <h2 className="hidden">
        1군 엔트리 선수 검색하기
        {iconCount}
      </h2>
      <Table
        tableColumns={BETTING_COLUMNS}
        tableData={players}
        search={true}
        colWidths={["200px", "100px", "auto", "80px", "80px"]}
        tableHeight="400px"
        placeholder="선수 정보를 검색해주세요 (ex: 김현수, 좌익수, 좌투좌타 등)"
        setIsSearched={setIsSearched}
      />
      <ButtonList>
        <Button
          type="button"
          title="RANDOM ROASTER"
          color="white"
          size="small"
          handleClick={() => generatorRandomRoaster(tableRowData.current)}
          hasArrow={false}
          disabled={isSearched}
        />
        <LinkButton
          path={`/statistics/${formatDate(getLatestDate(), "yyyyMMdd")}`}
          title="CHECK LATEST STATISTICS"
          color="white"
          size="small"
          hasArrow={false}
        />
      </ButtonList>
    </Wrapper>
  );
}

SearchEntry.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRoaster: PropTypes.func.isRequired,
};

export default React.memo(SearchEntry);
