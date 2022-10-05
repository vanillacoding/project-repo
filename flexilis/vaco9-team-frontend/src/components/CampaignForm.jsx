import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { BsCloudUpload } from 'react-icons/bs';
import { parseISO, differenceInCalendarDays, format, addDays } from 'date-fns';
import Select from 'react-select';

import Card from './Card';
import Modal from './Modal';
import AdPreview from './AdPreview';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.CAMPAIGN_FORM_BACKGROUND};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
  font-family: 'Nanum Barun Gothic';
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 30px;
  padding: 25px 25px 25px 0;
`;

const Title = styled.span`
  margin: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width || '600px'};
  margin: 0 100px 0 0;
`;

const EstimateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 360px;
  margin: 0 100px 0 0;
`;

const InputWrapper = styled.div`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
`;

const UploaderWrapper = styled.section`
  height: 0;
`;

const UploaderAddImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 3px;
  left: 33%;
`;

const UploaderAddImageRule = styled.span`
  font-size: 10px;
  padding-bottom: 3px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

const Uploader = styled.form`
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 400px;
  left: 45px;
  width: 500px;
`;

const UploadLabel = styled.label`
  margin-left: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const UploadInput = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const UploadBar = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CustomSelect = styled.select`
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.BACKGROUND};
  padding: 10px;
  cursor: pointer;
  outline: none;
`;

const DateInput = styled.input`
  margin: 10px 0;
  border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
	width: 93%;
  border-radius: 0.4rem;
  cursor: pointer;
  outline: none;
`;

const Input = styled.input`
	border: 1px solid ${props => props.theme.OUTLINE};
	padding: 10px 15px;
  width: ${props => props.width ? props.width : '100%'};
  border-radius: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Slider = styled.input`
  appearance: none;
  cursor: pointer;
  &::-webkit-slider-runnable-track {
    height: 5px;
    width: 100%;
    cursor: pointer;
    pointer-events: none;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background-color: #f9f9f9;
    border-radius: 2px;
    border: 1px solid #000101;
  }
  &::-webkit-slider-thumb {
    height: 16px;
    width: 16px;
    appearance: none;
    background: #fff;
    border-radius: 8px;
    margin-top: -6px;
    border: 1px solid #c77;
  }
  &:active::-webkit-slider-thumb {
    background: ${props => props.theme.HOVER};
  }
  &:focus {
    outline: none;
  }
`;

const SliderPrice = styled.span`
  align-self: center;
  font-size: 30px;
  margin: 20px;
`;

const Estimate = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin: 20px 0;
  width: 40%;
  padding: 10px 15px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.HOVER};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  height: 1px;
  margin: 10px 0;
  background-color: ${props => props.theme.OUTLINE};
`;

const Label = styled.label`
  margin: 3px;
`;

const ADPreviewButton = styled.button`
  margin: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;
  background-color: ${props => props.theme.LIGHT};
  &:hover {
    background-color: ${props => props.theme.DARK}
  }
`;

const DailyEstimateResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const DailyEstimateResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const DailyEstimateResultsTitle = styled.span`
  padding-bottom: 30px;
  font-size: 18px;
`;

const DailyEstimateReachAndClick = styled.span`
  align-self: center;
  font-size: 14px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

const DailyEstimateResults = styled.span`
  font-size: 20px;
  color: black;
`;

const LimitText = styled.span`
  font-size: 13px;
`;

const TargetSettingHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const TargetTitle = styled.span`
  font-size: 23px;
`;

const TargetSubTitle = styled.span`
  margin-top: 10px;
  font-size: 13px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

const TargetSettingAge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 40px;
`;

const TargetSettingGenderAndCountry = styled.div`
  display: flex;
  align-items: center;
  margin: 4%;
`;

const TargetGenderAndCountrySelect = styled.select`
  margin-left: 5%;
  border: 1px solid ${props => props.theme.OUTLINE};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.BACKGROUND};
  padding: 10px;
  outline: none;
`;

const EndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EndDateOption = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
`;

const EndDateSetting = styled.div`
  display: flex;
  margin: 5px;
  width: 100%;
`;

const PaymentSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const PaymentSummaryText = styled.span`
  font-size: 18px;
`;

const PaymentSummarySubText = styled.span`
  margin: 15px 0 0 1px;
  margin-top: 15px;
  font-size: 15px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

const PaymentAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 10px 10px 11px;
`;

const PaymentAmountDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentAmountText = styled.span`
  font-size: 14px;
`;

const PaymentAmountSubText = styled.span`
  margin: 15px 0 0 1px;
  margin-top: 15px;
  font-size: 12px;
  color: ${props => props.theme.TARGET_SUB_TITLE};
`;

const TotalPaymentAmout = styled.span`
  font-size: 15px;
`;

const countries = [
  { value: 'South Korea', label: '한국' },
  { value: 'Japan', label: '일본' },
  { value: 'China', label: '중국' },
  { value: 'India', label: '인도' },
  { value: 'United States of America', label: '미국' }
];

const ReactSelectWrapper = styled.div`
  display: inline;
  margin-left: 5%;
  min-width: 30%;
  width: fit-content;
`;

export default function CampaignForm({ estimate, imageUrl, onImageUpload, onFormSubmit, onCountrySelect, setMinAge, setMaxAge, setGender, setDailyBudget, dailyBudget }) {
  const [isAdPreview, setIsAdPreview] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    control,
  } = useForm();
  const watchType = watch('expiresType', 'expired');
  const watchExpiresAt = watch('expiresAt', format(addDays(new Date(), 5), 'yyyy-MM-dd'));
  const campaignDuration = differenceInCalendarDays(parseISO(watchExpiresAt), new Date());

  return (
    <>
      <GlobalStyle />
      <Container>
        <TitleWrapper>
          <Title>캠페인 시작하기</Title>
        </TitleWrapper>
        <UploaderWrapper>
          <Uploader
            onSubmit={onImageUpload}
            encType="multipart/form-data"
          >
            <UploadLabel htmlFor="file">이미지 선택</UploadLabel>
            <input
              type="file"
              id="file"
              name="image"
              style={{ display: 'none' }}
              accept='image/jpg,impge/png,image/jpeg,image/gif'
            />
            <UploadBar>
              <UploadInput type="submit" value="업로드" />
              <BsCloudUpload size={20} style={{ color: imageUrl ? 'green' : 'red', margin: '10px 10px 10px 20px' }} />
            </UploadBar>
          </Uploader>
        </UploaderWrapper>
        <FormWrapper>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <ContentWrapper>
              <InputWrapper>
                <Card title="캠페인 제목">
                  <Input
                    type="text"
                    name="title"
                    accept=".jpg,.png,.jpeg"
                    {...register('title')}
                  />
                </Card>
                <Card title="캠페인 타입">
                  <SelectWrapper>
                    <CustomSelect
                      name="campaignType"
                      {...register('campaignType')}
                    >
                      <option value={'banner'}>배너</option>
                      <option value={'text'}>텍스트</option>
                      <option value={'video'}>비디오</option>
                    </CustomSelect>
                  </SelectWrapper>
                </Card>
                <Card title="웹 사이트 주소">
                  <Input
                    type="text"
                    name="campaignUrl"
                    {...register('campaignUrl')}
                  />
                </Card>
                <Card title="배너 이미지 추가하기">
                  <UploaderAddImageContainer>
                    <UploaderAddImageRule>이미지 업로드는 최대 1MB까지 가능합니다.</UploaderAddImageRule>
                    <UploaderAddImageRule>이미지 선택 후 '업로드'를 클릭하세요.</UploaderAddImageRule>
                  </UploaderAddImageContainer>
                </Card>
              </InputWrapper>
              <InputWrapper>
                <TargetSettingHeader>
                  <TargetTitle>타겟</TargetTitle>
                  <TargetSubTitle>누구에게 광고를 내보내시겠어요?</TargetSubTitle>
                </TargetSettingHeader>
                <TargetSettingAge>
                  <Label>나이</Label>
                  <Controller
                    control={control}
                    name="minAge"
                    render={({ onChange, name }) => (
                      <Input
                        width={'22%'}
                        type="number"
                        min="18"
                        max="65"
                        name={name}
                        onChange={(e) => {
                          setMinAge(e.target.value);
                        }}
                      />
                    )}
                  />
                  <LimitText>세 이상</LimitText>
                  <Controller
                    control={control}
                    name="maxAge"
                    render={({ onChange, name }) => (
                      <Input
                        width={'22%'}
                        type="number"
                        min="18"
                        max="65"
                        name={name}
                        onChange={(e) => {
                          setMaxAge(e.target.value);
                        }}
                      />
                    )}
                  />
                  <LimitText>세 이하</LimitText>
                </TargetSettingAge>
                <TargetSettingGenderAndCountry>
                  <Label>성별</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ onChange, name }) => (
                      <TargetGenderAndCountrySelect
                        name={name}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        <option value='male'>남성</option>
                        <option value='female'>여성</option>
                        <option value='both'>모두</option>
                      </TargetGenderAndCountrySelect>
                    )}
                  />
                </TargetSettingGenderAndCountry>
                <TargetSettingGenderAndCountry>
                  <Label>국가</Label>
                  <ReactSelectWrapper>
                    <Select
                      onChange={onCountrySelect}
                      options={countries}
                      isMulti
                    />
                  </ReactSelectWrapper>
                </TargetSettingGenderAndCountry>
              </InputWrapper>
              <InputWrapper>
                <Card title="기간">
                  <EndDateWrapper>
                    <EndDateOption>
                      <CustomSelect
                        name="expiresType"
                        defaultValue="expired"
                        {...register('expiresType')}
                      >
                        <option value={'expired'}>종료일 선택</option>
                        <option value={'continue'}>종료일 없이 계속 게재</option>
                      </CustomSelect>
                    </EndDateOption>
                    <EndDateSetting>
                      {watchType === 'expired' && (
                        <DateInput
                          type="date"
                          min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                          value={watchExpiresAt}
                          {...register('expiresAt')}
                        />
                      )}
                    </EndDateSetting>
                  </EndDateWrapper>
                </Card>
                <Card title='일일 예산'>
                  <SliderWrapper>
                    <SliderPrice>{(dailyBudget * 1).toLocaleString()} 원</SliderPrice>
                    <Controller
                      control={control}
                      name="dailyBudget"
                      render={({ onChange, name }) => (
                        <Slider
                          type="range"
                          min="5000"
                          max="200000"
                          step="5000"
                          name={name}
                          onChange={(e) => {
                            setDailyBudget(e.target.value);
                          }}
                        />
                      )}
                    />
                  </SliderWrapper>
                </Card>
              </InputWrapper>
            </ContentWrapper>
            <EstimateWrapper>
              <Estimate>
                <Divider />
                <ADPreviewButton
                  type="button"
                  onClick={() => setIsAdPreview(true)}
                >
                  <span>광고 미리보기</span>
                </ADPreviewButton>
                <Divider />
                <DailyEstimateResultsWrapper>
                  <DailyEstimateResultsTitle>
                    일일 추산 결과
                  </DailyEstimateResultsTitle>
                  <DailyEstimateResultsContainer>
                    <DailyEstimateReachAndClick>도달</DailyEstimateReachAndClick>
                    <DailyEstimateResults>
                      {estimate.cpm ? `${(Math.floor(dailyBudget / estimate.cpm * 1000 * 0.95)).toLocaleString()} ~ ${(Math.floor(dailyBudget / estimate.cpm * 1000 * 1.05)).toLocaleString()}명` : '타겟을 설정하세요'}
                    </DailyEstimateResults>
                  </DailyEstimateResultsContainer>
                  <DailyEstimateResultsContainer>
                    <DailyEstimateReachAndClick>링크 클릭</DailyEstimateReachAndClick>
                    <DailyEstimateResults>
                      {estimate.cpm ? `${(Math.floor(dailyBudget / estimate.cpc * 0.95)).toLocaleString()} ~ ${(Math.floor(dailyBudget / estimate.cpc * 1.05)).toLocaleString()}명` : '타겟을 설정하세요'}
                    </DailyEstimateResults>
                  </DailyEstimateResultsContainer>
                </DailyEstimateResultsWrapper>
                <Divider />
                <PaymentSummaryContainer>
                  <PaymentSummaryText>결제 요약</PaymentSummaryText>
                  <PaymentSummarySubText>광고가 {campaignDuration}일 동안 게재됩니다.</PaymentSummarySubText>
                </PaymentSummaryContainer>
                <PaymentAmountContainer>
                  <PaymentAmountDescription>
                    <PaymentAmountText>총 결제금액</PaymentAmountText>
                    <PaymentAmountSubText>일일 {(dailyBudget * 1).toLocaleString()}원X{campaignDuration}일</PaymentAmountSubText>
                  </PaymentAmountDescription>
                  <TotalPaymentAmout>{(dailyBudget * campaignDuration).toLocaleString()} 원</TotalPaymentAmout>
                </PaymentAmountContainer>
              </Estimate>
              <ButtonWrapper>
                <Button type="submit">
                  <span>시작하기</span>
                </Button>
              </ButtonWrapper>
            </EstimateWrapper>
          </Form>
        </FormWrapper>
      </Container >
      {
        isAdPreview &&
        <Modal>
          <AdPreview
            imageUrl={imageUrl}
            setIsAdPreview={setIsAdPreview}
          />
        </Modal>
      }
    </>
  );
}

CampaignForm.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
