import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import SlideList from "./SlideList";
import LoadingSpinner from "./LoadingSpinner";
import PPT_DATA_TYPES from "../config/constants/pptDataTypes";
import SEQUENCES from "../config/constants/sequences";
import CONFIG from "../config/constants/config";
import { changeSequence } from "../features/sequenceReducer";
import { registerData } from "../features/pptDataReducer";
import { useSetScroll } from "../hooks/useScroll";

function Download() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const setScroll = useSetScroll();

  useEffect(() => {
    setScroll(0);
  }, [setScroll]);

  useEffect(() => {
    const getPptData = async () => {
      const response = await axios.get(
        `${CONFIG.API_SERVER_URL}/:ppt_id/download`,
        {
          params: { mergedPptId: id },
        },
      );

      dispatch(
        registerData({
          type: PPT_DATA_TYPES.MERGED_PPT_DATA,
          pptId: id,
          data: response.data,
        }),
      );
      setIsFetching(true);
    };

    try {
      dispatch(changeSequence(SEQUENCES.DOWNLOAD));
      getPptData();
    } catch (error) {
      navigate("/error");
    }
  }, [id, dispatch, navigate]);

  const handleListScroll = (event) => {
    const { scrollHeight, offsetHeight, scrollTop } = event.target;
    setScroll((scrollTop / (scrollHeight - offsetHeight)) * 100);
  };

  if (!isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <DownloadContainer onScroll={handleListScroll}>
      <SlideList fileType={PPT_DATA_TYPES.MERGED_PPT_DATA} />
    </DownloadContainer>
  );
}

const DownloadContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 28vw;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default Download;
