import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import Table from "../Shared/Table";

const TableWrapper = styled.div`
  margin: 0 0 1rem 0;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-family: "Bebas Neue";
  font-size: ${({ theme }) => theme.fontSize.middle};
`;

const RANKING_COLUMNS = [
  {
    Header: "RANK",
    accessor: "rank",
  },
  {
    Header: "NAME",
    accessor: "user.name",
  },
  {
    Header: "EARNED MONEY",
    accessor: "earnedMoney",
  },
];

function RankingTable({ title, rankings }) {
  return (
    <TableWrapper>
      <Title>{title}</Title>
      <Table
        tableColumns={RANKING_COLUMNS}
        tableData={rankings}
        search={false}
        colWidths={["100px", "auto", "200px"]}
        tableHeight="auto"
      />
    </TableWrapper>
  );
}

RankingTable.propTypes = {
  title: PropTypes.string.isRequired,
  rankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RankingTable;
