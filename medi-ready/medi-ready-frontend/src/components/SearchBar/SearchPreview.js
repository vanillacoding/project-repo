import React from "react";
import styled from "styled-components";

const SearchPreview = ({ id, name, frequency, updateValue, index }) => {
  const medicineName = name.length > 15 ? name.substring(0, 15) + "..." : name;

  return (
    <PreviewWrapper href="#" onClick={() => updateValue(name)} id={id} index={index}>
      <Name>
        <span>{medicineName}</span>
      </Name>
      <Count>
        <em>{frequency}</em>
        <span>frequency</span>
      </Count>
    </PreviewWrapper>
  );
};

const PreviewWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-color: 1px solid #e9e9e9;
  transition: 0.1s;

  :hover, :focus {
    background-color: #f3f3f3;
    outline: none;
  }
`;

const Name = styled.div`
  span {
    font-size: 14px;
    color: #797979;
  }
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  em {
    font-size: 12px;
  }

  * {
    font-weight: 600;
    font-size: 10px;
    color: #797979;
  }
`;

SearchPreview.defaultProps = {
  count: 0,
};

export default SearchPreview;
