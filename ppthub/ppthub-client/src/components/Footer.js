import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import SEQUENCES from "../config/constants/sequences";
import PPT_DATA_TYPES from "../config/constants/pptDataTypes";
import THEME_COLORS from "../config/constants/themeColors";
import CONFIG from "../config/constants/config";
import { registerData } from "../features/pptDataReducer";
import { initializeDiffData } from "../features/diffDataReducer";
import {
  changeSequence,
  changePreviousSequence,
  initializeSequence,
} from "../features/sequenceReducer";
import { useToast } from "../hooks/useToast";
import TOAST_MESSAGES from "../config/constants/toastMessages";

function Footer() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sequence = useSelector((state) => state.sequence);
  const mergeData = useSelector((state) => state.diffData);
  const slideOrderList = useSelector((state) => state.slideOrderList);

  const { originalPptId, comparablePptId, mergedPptId, downloadUrl } =
    useSelector(({ pptData }) => ({
      originalPptId: pptData[PPT_DATA_TYPES.ORIGINAL_PPT_DATA]?.pptId,
      comparablePptId: pptData[PPT_DATA_TYPES.COMPARABLE_PPT_DATA]?.pptId,
      mergedPptId: pptData[PPT_DATA_TYPES.MERGED_PPT_DATA]?.pptId,
      downloadUrl: pptData[PPT_DATA_TYPES.MERGED_PPT_DATA]?.data?.downloadUrl,
    }));

  const handlePreviousClick = () => {
    dispatch(changePreviousSequence());
  };

  const handleCompare = async () => {
    try {
      const response = await axios.post(
        `${CONFIG.API_SERVER_URL}/ppts/compare`,
        {
          originalPptId,
          comparablePptId,
        },
      );
      dispatch(initializeDiffData(response.data));
    } catch (error) {
      navigate("/error");
    }

    dispatch(changeSequence(SEQUENCES.COMPARISION));
  };

  const handleMerge = async () => {
    try {
      const response = await axios.post(`${CONFIG.API_SERVER_URL}/ppts/merge`, {
        originalPptId,
        comparablePptId,
        mergeData,
        slideOrderList,
      });

      dispatch(
        registerData({
          type: PPT_DATA_TYPES.MERGED_PPT_DATA,
          pptId: response.data,
        }),
      );
      toast(TOAST_MESSAGES.SUCCESS_MERGE_MESSAGE);
    } catch (error) {
      toast(TOAST_MESSAGES.FAILURE_MERGE_MESSAGE);
      navigate("/error");
    }
  };

  const handleDownloadPage = () => {
    dispatch(changeSequence(SEQUENCES.DOWNLOAD));
    navigate(`/${mergedPptId}/download`, { replace: true });
  };

  const handleFileDownload = async () => {
    await navigator.clipboard.writeText(
      `${CONFIG.CLIENT_URL}/${mergedPptId}/download`,
    );

    toast(TOAST_MESSAGES.COPY_CLIPBOARD_MESSAGE);
    window.location.href = downloadUrl;
    dispatch(changeSequence(SEQUENCES.COMPLETED_DOWNLOAD));
  };

  const handleInitialClick = () => {
    dispatch(initializeSequence());
    navigate("/", { replace: true });
  };

  return (
    <FooterContainer>
      {(() => {
        switch (sequence) {
          case SEQUENCES.INITIAL_SEQUENCE:
            return null;
          case SEQUENCES.ADDED_ORIGINAL_FILE:
            return (
              <FooterButton onClick={handlePreviousClick}>
                되돌리기
              </FooterButton>
            );
          case SEQUENCES.ADDED_COMPARABLE_FILE:
            return (
              <>
                <FooterButton onClick={handlePreviousClick}>
                  되돌리기
                </FooterButton>
                <FooterButton onClick={handleCompare}>비교하기</FooterButton>
              </>
            );
          case SEQUENCES.COMPARISION:
            return mergedPptId ? (
              <FooterButton onClick={handleDownloadPage}>
                다운로드 페이지로
              </FooterButton>
            ) : (
              <FooterButton onClick={handleMerge}>합치기</FooterButton>
            );
          case SEQUENCES.DOWNLOAD:
            return (
              <FooterButton onClick={handleFileDownload}>다운로드</FooterButton>
            );
          default:
            return (
              <FooterButton onClick={handleInitialClick}>처음으로</FooterButton>
            );
        }
      })()}
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 13vh;
  background: ${THEME_COLORS.SECTION_BACKGROUND};
  box-shadow: #30343f 10px 10px 20px;
  z-index: 0;
`;

const FooterButton = styled.button`
  padding: 0.8rem 2rem;
  margin-left: 3rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  background-color: ${THEME_COLORS.MAIN_COLOR};
  color: rgba(0, 0, 0, 0.85);
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    border-color: rgba(0, 0, 0, 0.15);
    background-color: #f0f0f1;
    color: rgba(0, 0, 0, 0.65);
    transform: translateY(0);
  }

  &:first-child {
    margin-left: 0;
  }
`;

export default Footer;
