import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import HeartCounter from "./HeartCounter";

const HeartInputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  width: 120px;
  margin-left: 10px;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  transform: translateY(3px);

  input {
    position: absolute;
    margin-right: 10px;
    width: 130px;
    -webkit-appearance: none;
    opacity: 0;
    cursor: pointer;
  }

  input::-webkit-slider-thumb {
    width: 10px;
    -webkit-appearance: none;
    height: 30px;
    background: ${({ theme }) => theme.point.main};
  }

  input::-webkit-slider-runnable-track {
    height: 30px;
    -webkit-appearance: none;
    margin-top: -1px;
  }

  .tooltip {
    position: absolute;
    z-index: 1;
    top: -190%;
    padding: 5%;
    margin-top: 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background.sub};
    font-size: 1rem;
    text-align: center;
  }

  .tooltip::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 30%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: ${({ theme }) => theme.background.sub} transparent transparent transparent;
  }

  .tooltip,
  .tooltip::after {
    animation: blink 3s 1 linear forwards;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    5% {
      opacity: 0.3;
    }

    10% {
      opacity: 1;
    }

    15% {
      opacity: 0.3;
    }

    20% {
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`;

function HeartInput({ count, onChange }) {
  const handleCountChange = function ({ target }) {
    onChange(Number(target.value));
  };

  return (
    <span>
      <HeartInputWrapper>
        <HeartCounter count={count} />
        <input
          type="range"
          name="heartCount"
          min="0"
          max="10"
          value={count}
          onChange={handleCountChange}
        />
        <span className="tooltip">Click to rate!</span>
      </HeartInputWrapper>
    </span>
  );
}

HeartInput.propTypes = {
  count: PropTypes.number,
  onChange: PropTypes.func,
};

export default HeartInput;
