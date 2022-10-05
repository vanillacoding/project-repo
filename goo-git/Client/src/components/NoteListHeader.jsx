import React from 'react';
import { NoteListHeaderWrapper } from '../styledComponents/MainBody.styled';

export default function NoteListHeader() {
  return (
    <NoteListHeaderWrapper>
      <section>
        <div>#</div>
        <div>제목</div>
        <div>최종 수정자</div>
        <div>날짜</div>
        <div>공유</div>
      </section>
    </NoteListHeaderWrapper>
  );
}
