import { format } from 'date-fns';

export const getDetailDate = date => {
  const noon = format(new Date(date), 'a..aaa');

  if (noon === 'AM') {
    return format(new Date(date), 'yyyy년 MM월 d일 오전 h시 m분');
  }

  return format(new Date(date), 'yyyy년 MM월 d일 오후 h시 m분');
}

export const getToday = format(new Date(new Date().toISOString()), 'yyyy년 MM월 d일');

export const getDate = date => format(new Date(date), 'yyyy-MM-dd');

export const getTime = date => {
  const noon = format(new Date(date), 'a..aaa');

  if (noon === 'AM') {
    return format(new Date(date), '오전 h시 m분');
  }

  return format(new Date(date), '오후 h시 m분');
};

export const local = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};
