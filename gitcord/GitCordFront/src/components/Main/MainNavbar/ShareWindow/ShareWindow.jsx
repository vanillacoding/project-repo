import React, { useCallback, useRef } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import styled from "styled-components";
import PropTypes from "prop-types";

const ShareWindowContainer = styled.div`
  width: 100%;
  height: 8%;
  padding: 10px;
  background-color: #FF6623;
  text-align: center;
  border-radius: 10px;
  animation: fadeOn .5s ease-in-out;

  span {
    display: block;
    margin-bottom: 5px;
    color: #ffffff;
    font-weight: bold;
  }

  input {
    margin-right: 10px;
  }

  .copy-icon {
    display: inline-block;
    padding-top: 10px;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  @keyframes fadeOn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

function ShareWindow({
  url,
  handleCopyButtonClick
}) {
  const textInput = useRef();

  const copyUrl = useCallback(() => {
    const urlText = textInput.current;

    urlText.select();
    document.execCommand("copy");
    handleCopyButtonClick();
  }, [textInput, handleCopyButtonClick]);

  return (
    <ShareWindowContainer>
      <span>INVITE</span>
      <input
        ref={textInput}
        type="text"
        value={url}
        readOnly
      />
      <div className="copy-icon">
        <RiFileCopyLine
          size={20}
          onClick={copyUrl}
        />
      </div>
    </ShareWindowContainer>
  );
}

ShareWindow.propTypes = {
  url: PropTypes.string.isRequired,
  handleCopyButtonClick: PropTypes.func.isRequired
};

export default React.memo(ShareWindow);
