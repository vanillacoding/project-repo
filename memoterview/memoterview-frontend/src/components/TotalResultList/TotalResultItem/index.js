import React from "react";

import TotalResultListColumn from "../TotalResultListColumn";
import TotalResultListRow from "../TotalResultListRow";
import { mappedFilterValue } from "./helper";


export default function TotalResultItem({ interviewee, columnList, onClick }) {
  function handleClick() {
    onClick({ intervieweeId: interviewee.id });
  }

  return (
    <TotalResultListRow onClick={handleClick}>
      {columnList.map((columnItem) => (
        <TotalResultListColumn key={columnItem}>
          {mappedFilterValue({ interviewee, columnItem })}
        </TotalResultListColumn>
      ))}
    </TotalResultListRow>
  );
}
