import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import useUpdateMetaData from "../../hooks/useUpdateMetaData";
import changeNumberFormat from "../../utils/changeNumberFormat";

const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 20px;
  border-bottom: 0.1px solid lightgray;
  font-size: 0.75rem;
`;

const MetaDataItem = styled.div`
  margin-left: 20px;
  display: flex;

  span {
    display: block;
    margin-left: 6px;
    font-family: "Noto Sans KR", sans-serif;
  }
  span:last-child,
  span:nth-child(2) {
    font-weight: 800;
  }
`;

const UpdateMetaData = styled.button`
  margin-left: 20px;
  margin-top: 2px;
`;

const MetaData = () => {
  const { metadata, isMetadataLoading } = useSelector(
    (state) => state.coinReducer
  );

  const handleUpdateMetaData = useUpdateMetaData();

  return (
    <MetaDataContainer>
      <MetaDataItem>
        <span>기준 시점</span>
        <span>{metadata?.time}</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>전체 시가총액</span>
        <span>
          {metadata && changeNumberFormat(metadata.marketCapDollar, "cut")}달러
        </span>
        <span>
          {metadata && changeNumberFormat(metadata.marketCapWon, "cut")}원
        </span>
      </MetaDataItem>
      <MetaDataItem></MetaDataItem>
      <MetaDataItem>
        <span>비트코인 도미넌스</span>
        <span>{metadata?.dominance}</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>김치 프리미엄</span>
        <span>{metadata?.premium}%</span>
      </MetaDataItem>
      <MetaDataItem>
        <span>현재 환율</span>
        <span>{changeNumberFormat(metadata?.rate)}원/달러</span>
      </MetaDataItem>
      {isMetadataLoading ? (
        <span>&nbsp; &nbsp; 최신 정보를 불러오는 중입니다..</span>
      ) : (
        <UpdateMetaData onClick={handleUpdateMetaData}>업데이트</UpdateMetaData>
      )}
    </MetaDataContainer>
  );
};

export default MetaData;
