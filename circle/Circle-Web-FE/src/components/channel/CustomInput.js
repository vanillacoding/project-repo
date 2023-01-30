import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import StyledInput from "../shared/StyledInput";

export default function CustomInput({
  label = "",
  value = "",
  maxLength = Infinity,
  handleOnChange,
}) {
  return (
    <Container>
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        value={value}
        maxLength={maxLength}
        onChange={handleOnChange}
      />
      <LimitMessageWrapper>
        <LimitMessage>{`${maxLength}자 이내`}</LimitMessage>
      </LimitMessageWrapper>
    </Container>
  );
}

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  handleOnChange: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const Label = styled.label`
  width: 120px;
  margin-right: 10px;
  font-size: 20px;
  text-align: center;
`;

const Input = styled(StyledInput)`
  flex: 3;
  height: 30px;
  width: 100%;
  padding: 10px 12px;
`;

const LimitMessageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  width: 50px;
  height: 100%;
`;

const LimitMessage = styled.p`
  margin-bottom: 10px;
  font-size: 12px;
`;
