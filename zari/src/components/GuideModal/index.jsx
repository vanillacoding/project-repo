import React, { useState } from 'react';

import { GuideModal as S } from './styles';

export default function GuideModal() {
  const [showGuide, setShowGuide] = useState(false);

  function handleClickHelpCircle() {
    setShowGuide(state => !state);
  }

  return (
    <>
      <S.GuideContent toggled={showGuide}>
        <S.GuideContentWrapper>
          <S.Title>조작법</S.Title>
        </S.GuideContentWrapper>
        <S.DivideLine />
        <S.GuideContentWrapper>
          <S.Text>캐릭터 이동</S.Text>
          <S.KeyBoxContainer>
            <S.KeyBox color="#fed330">
              <S.ArrowUpKey color="white" />
            </S.KeyBox>
            <S.KeyBox color="#fed330">
              <S.ArrowDownKey color="white" />
            </S.KeyBox>
            <S.KeyBox color="#fed330">
              <S.ArrowLeftKey color="white" />
            </S.KeyBox>
            <S.KeyBox color="#fed330">
              <S.ArrowRightKey color="white" />
            </S.KeyBox>
          </S.KeyBoxContainer>
        </S.GuideContentWrapper>
        <S.GuideContentWrapper>
          <S.Text>채팅공간 선택</S.Text>
          <S.KeyBoxContainer>
            <S.KeyBox color="#78e08f">
              <S.KeyText>1</S.KeyText>
            </S.KeyBox>
            <S.KeyBox color="#78e08f">
              <S.KeyText>2</S.KeyText>
            </S.KeyBox>
            <S.KeyBox color="#78e08f">
              <S.KeyText>3</S.KeyText>
            </S.KeyBox>
            <S.KeyBox color="#78e08f">
              <S.KeyText>4</S.KeyText>
            </S.KeyBox>
          </S.KeyBoxContainer>
        </S.GuideContentWrapper>
        <S.GuideContentWrapper>
          <S.Text>선택 취소</S.Text>
          <S.KeyBoxContainer>
            <S.KeyBox color="#fc5c65">
              <S.KeyText>Esc</S.KeyText>
            </S.KeyBox>
          </S.KeyBoxContainer>
        </S.GuideContentWrapper>
        <S.GuideContentWrapper>
          <S.Text>채팅공간 개설</S.Text>
          <S.KeyBoxContainer>
            <S.KeyBox color="#4b7bec">
              <S.KeyText>Space</S.KeyText>
            </S.KeyBox>
          </S.KeyBoxContainer>
        </S.GuideContentWrapper>
      </S.GuideContent>
      <S.ButtonContainer>
        <S.HelpButton
          size={48}
          onClick={handleClickHelpCircle}
        />
      </S.ButtonContainer>
    </>
  );
}
