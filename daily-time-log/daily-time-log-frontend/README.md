# DAILY TIME LOG

  <img src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/home.png?raw=true" alt="demo" />

구글 캘린더를 연동하여 일정을 확인하고, 독서 등 목표를 정해서 해당 목표를 실행한 시간을 기록합니다.

## Index

- [Demo](#demo)
- [Repository](#repository)
- [Feature](#feature)
- [Stack](#stack)

## Demo

[https://www.daily-time-log.xyz](https://www.daily-time-log.xyz)

## Repository

FRONT-END: [https://github.com/jch1223/daily-time-log-frontend](https://github.com/jch1223/daily-time-log-frontend)  
BACK-END: [https://github.com/jch1223/daily-time-log-backend](https://github.com/jch1223/daily-time-log-backend)

## Feature

<div style="display: flex; text-align: center;">
  <img style="width: 48%; margin: 1%;" src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/running-time.gif?raw=true" alt="running-time" />
  <img style="width: 48%; margin: 1%;" src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/darkmode.gif?raw=true" alt="darkmode" />
</div>

### Light & Dark Theme 모드

styled-component의 `ThemeProvider`를 사용하여 Light Theme과 Dark Theme을 구현.

### 캘린더 일정 생성 & 삭제

  <img style="width: 50%;" src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/schedule-demo.gif?raw=true" alt="schedule-demo" />
  
구글 첫 로그인 시 `daily-time-log` 이름으로 보조 달력을 생성하고, 해당 달력에 일정을 추가 삭제 할 수 있습니다.

### 캘린더 일정 rendering

하루에 여러가지 일정이 있고, 해당하는 일정이 이틀 이상 일 경우 달력에 일정별로 연결되어서 나타나게 하기 위해서 Redux에서 state를 관리 할 때 normalize 패턴을 사용했습니다.

일정을 state에 넣을 때 index를 함께 지정하여 이를 기준으로 달력에서 일정의 위치를 정했습니다.

### 목표 CRUD

목표를 생성 할 때 `input` 태그가 아닌 div 태그의 `contentEditable="true"`속성을 이용하여 구현하였습니다. 목표 생성시 ref를 사용하여 focusing 합니다. play버튼을 클릭 시 진행 시간이 표시되는 모달창이 노출됩니다.

### 진행 시간 표시

<div style="display: flex; text-align: center;">
  <img style="width: 48%; margin: 1%;" src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/before-timelog.gif?raw=true" alt="before-timelog" />
  <img style="width: 48%; margin: 1%;" src="https://github.com/jch1223/daily-time-log-frontend/blob/master/readme.assets/aftre-timelog.gif?raw=true" alt="aftre-timelog" />
</div>

TIMETABLE이 날짜에 대한 정보도 가지고 있어야 진행 시간에 대한 데이터 관리가 편할 것 같다고 생각을 하여, TIMETABLE의 key값을 `YYYY-MM-DDTHH:mm:ss`로 지정을 하였습니다. 이로 인해 날짜가 바뀔 경우 TIMETABLE 전체가 리렌더링되면서 날짜을 빠른 속도로 변경 할 경우 렌더링이 정상적으로 되지 않는 현상이 있었습니다.

이를 해결하기 로직과 key값을 `HH:mm:ss`로 변경하여, html이 dom을 다시 그리를 일을 최소화하여 날짜를 빠른 속도롤 변경하여도 렌더링이 정상적으로 되도록 수정하였습니다.

### Date 관리

Date를 처리하는 로직은 day.js를 사용하고, 날짜 데이터는 iso형식과 timezone을 저장하여 관리하였습니다.

## Stack

### Frontend

- Typescript / React
- Redux / React Query
- Styled Component

### Backend

- Nodejs / Express
- MongoDB, Mongoose

### Common

- Commitizen
