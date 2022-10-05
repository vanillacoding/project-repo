import React from "react";
import styled from "styled-components";

import FlexBox from "../Shared/FlexBox";
import TextArea from "../Shared/TextArea";
import TextInput from "../Shared/TextInput";

const Detail = ({ prescription }) => {
  const description = prescription.description;
  const date = prescription.created_at.slice(0, 10);
  const { name, picture } = prescription.patient.user;

  return (
    <Wrapper>
      <StyledFlexBox>
        <ImageBox>
          <img src={picture} alt={name} />
        </ImageBox>
        <InfoBox>
          <b>{name}</b>
          <FlexBox>
            <em>Prescription Date</em>
            <span>{date}</span>
          </FlexBox>
        </InfoBox>
      </StyledFlexBox>

      {prescription.medicines.map((medicine) => {
        const { itemName } = medicine.medicine_detail;

        return (
          <TextInput label={itemName} value={itemName} readOnly />
        );
      })}

      <TextArea name="description" value={description} readOnly />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 550px;
  height: 600px;
  padding-top: 20px;

  input {
    margin-top: 10px;
  }

  textarea {
    margin-top: 20px;
  }
`;

const StyledFlexBox = styled(FlexBox)`
  * {
    color: #767676;
  }

  > * {
    margin-top: 0;
  }

  align-items: center;
  padding-bottom: 20px;
`;

const DateTitle = styled.div`
  font-size: 20px;
`;

const ImageBox = styled.span`
  width: 110px;

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  margin-left: 20px;

  div span {
    font-size: 14px;
    line-height: 1.1;
  }

  b {
    font-size: 24px;
    font-weight: 400;
  }
`;

export default Detail;
