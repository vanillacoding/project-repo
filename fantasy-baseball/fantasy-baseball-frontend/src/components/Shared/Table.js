import React, {
  useState,
  useMemo,
  useLayoutEffect,
  useRef,
} from "react";

import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import styled from "styled-components";

import Input from "./Input";

const Table = styled.div`
  width: 100%;
  display: table;
`;

const TableHeader = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.grey};
  font-family: "Bebas Neue";
  font-size: ${({ theme }) => theme.fontSize.middle};
  color: ${({ theme }) => theme.color.white};

  &.scroll {
    padding: 0 15px 0 0;
  }

  .tr {
    width: 100%;
    display: table;
    table-layout: fixed;
  }

  .th {
    padding: ${({ theme }) => theme.padding.small};
    display: table-cell;
    text-align: center;
    cursor: pointer;

    &.sort-asc::after {
      padding: 0 0 0 0.5rem;
      font-size: 0.4rem;
      content: "▼";
      vertical-align: middle;
    }

    &.sort-desc::after {
      padding: 0 0 0 0.5rem;
      font-size: 0.4rem;
      content: "▲";
      vertical-align: middle;
    }
  }
`;

const TableBody = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  background: ${({ theme }) => theme.color.darkgrey};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.color.white};
  overflow-y: auto;

  .tr {
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.color.black};
    display: table;
    table-layout: fixed;
  }

  .td {
    padding: ${({ theme }) => theme.padding.small};
    border-right: 1px solid ${({ theme }) => theme.color.black};
    display: table-cell;
    text-align: center;

    &:last-child {
      border-right: none;
    }
  }
`;

function SharedTable(props) {
  const {
    tableColumns,
    tableData,
    search,
    colWidths,
    tableHeight,
    placeholder,
    setIsSearched,
  } = props;

  const [keyword, setKeyword] = useState("");
  const [scrollbar, setScrollbar] = useState(0);

  const tableRef = useRef();
  const tableBodyRef = useRef();

  const columns = useMemo(() => tableColumns, []);
  const data = useMemo(() => tableData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
    setGlobalFilter(value);

    if (setIsSearched) {
      setIsSearched(true);

      if (value === "") {
        setIsSearched(false);
      }
    }
  };

  useLayoutEffect(() => {
    const scrollbarWidth = tableRef.current.clientWidth - tableBodyRef.current.clientWidth;
    if (scrollbarWidth > 0) {
      setScrollbar(scrollbarWidth);
      return;
    }

    setScrollbar(0);
  }, [tableBodyRef]);

  return (
    <>
      {search && (
        <Input
          type="text"
          name="keyword"
          value={keyword}
          placeholder={placeholder}
          handleChange={handleInputChange}
        />
      )}
      <Table ref={tableRef} {...getTableProps()}>
        <TableHeader
          className={scrollbar > 0 ? "scroll" : ""}
        >
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              className="tr"
            >
              {headerGroup.headers.map((column, index) => (
                <div
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "th sort-desc"
                        : "th sort-asc"
                      : "th"
                  }
                  style={{ width: colWidths[index] }}
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </TableHeader>
        <TableBody
          {...getTableBodyProps()}
          ref={tableBodyRef}
          height={tableHeight}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div
                className="tr"
                {...row.getRowProps()}
              >
                {row.cells.map((cell, index) => (
                  <div
                    className="td"
                    {...cell.getCellProps()}
                    style={{ width: colWidths[index] }}
                  >
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

SharedTable.propTypes = {
  tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.bool.isRequired,
  colWidths: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableHeight: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  setIsSearched: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
};

SharedTable.defaultProps = {
  placeholder: "키워드를 입력해주세요.",
  setIsSearched: false,
};

export default SharedTable;
