import { faBars, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import TotalResultListColumn from "../TotalResultListColumn";
import TotalResultListRow from "../TotalResultListRow";

const TotalResultListHeaderWrapper = styled(TotalResultListRow)`
  position: relative;
  background-color: ${({ theme }) => theme.GulfBlue};
  border: 1px solid gray;
  font-size: 1.2em;
  color: ${({ theme }) => theme.Solitude};

  &:hover {
    background-color: ${({ theme }) => theme.GulfBlue};
  }
`;

const TotalResultListFilterWrapper = styled(TotalResultListColumn)`
  position: absolute;
  right: 10px;
  width: 50px;
  height: 100%;

  svg {
    font-size: 1.5em;
  }
`;

const ColumnItemWrapper = styled.div`
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
  &:hover {
    svg {
      transform: rotate(180deg);
    }
  }
`;

export default function TotalResultListHeader({
  columnList,
  onFilterSortBtnClick,
  onFilterBtnClick,
}) {
  return (
    <TotalResultListHeaderWrapper>
      {columnList.map((columnItem) => (
        <TotalResultListColumn key={columnItem}>
          <ColumnItemWrapper onClick={() => onFilterSortBtnClick(columnItem)}>
            <FontAwesomeIcon icon={faSort}/>
            {columnItem}
          </ColumnItemWrapper>
        </TotalResultListColumn>
      ))}
      <TotalResultListFilterWrapper>
        <FontAwesomeIcon icon={faBars} onClick={onFilterBtnClick} />
      </TotalResultListFilterWrapper>
    </TotalResultListHeaderWrapper>
  );
}
