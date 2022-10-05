import React from "react";

import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import styled from "styled-components";

import Table from "../Shared/Table";

const ResultLink = styled.a`
  color: ${({ theme }) => theme.color.white};
`;

function HistoryTable({ history }) {
  const renderLinkIcon = ({ value }) => (
    <ResultLink href={value}>
      <FontAwesomeIcon icon={faExternalLinkAlt} />
    </ResultLink>
  );

  const renderCalculated = ({ value }) => {
    if (value) {
      return (
        <p>O</p>
      );
    }

    return <p>X</p>;
  };

  const HISTORY_COLUMNS = [
    {
      Header: "date",
      accessor: "gameDate",
    },
    {
      Header: "betting money",
      accessor: "bettingMoney",
    },
    {
      Header: "calculated",
      accessor: "isCalculated",
      Cell: renderCalculated,
    },
    {
      Header: "earned money",
      accessor: "earnedMoney",
    },
    {
      Header: "±",
      accessor: (row) => (
        row.earnedMoney - row.bettingMoney
      ),
    },
    {
      Header: "rank",
      accessor: "rank",
    },
    {
      Header: "result",
      accessor: (row) => (
        `/result/${row.gameDate}`
      ),
      Cell: renderLinkIcon,
    },
  ];

  return (
    <Table
      tableColumns={HISTORY_COLUMNS}
      tableData={history}
      colWidths={
        [
          "100px",
          "200px",
          "120px",
          "auto",
          "80px",
          "80px",
          "80px",
        ]
      }
      tableHeight="auto"
      search={true}
    />
  );
}

HistoryTable.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HistoryTable;
