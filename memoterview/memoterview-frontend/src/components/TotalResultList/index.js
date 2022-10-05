import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { sortInterviewees } from "../../redux/reducers/interviewees";
import TotalResultEntry from "./TotalResultEntry";
import TotalResultListHeader from "./TotalResultListHeader";

const TotalResultListWrapper = styled.div`
  width: 100%;
`;

export default function TotalResultList({
  interviewees,
  onFilterBtnClick,
  filters,
  onResultItemClick,
}) {
  const [sortState, setSortState] = useState({ filter: -1, order: 1 });

  const [sortedInterviewees, setSortedInterviewees] = useState(interviewees);

  useEffect(() => {
    setSortedInterviewees(interviewees);
  }, [interviewees]);

  function handleFilterSortBtnClick(sortFilter) {
    const newSortState =
      sortState.filter === sortFilter
        ? { ...sortState, order: sortState.order * -1 }
        : { filter: sortFilter, order: 1 };

    const newSortedInterviewees = sortInterviewees({
      interviewees: sortedInterviewees,
      ...newSortState,
    });

    setSortedInterviewees(newSortedInterviewees);
    setSortState(newSortState);
  }

  return (
    <TotalResultListWrapper>
      <TotalResultListHeader
        columnList={filters}
        onFilterSortBtnClick={handleFilterSortBtnClick}
        onFilterBtnClick={onFilterBtnClick}
      />
      <TotalResultEntry
        interviewees={sortedInterviewees}
        columnList={filters}
        onItemClick={onResultItemClick}
      />
    </TotalResultListWrapper>
  );
}
