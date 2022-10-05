import React, { useState } from 'react';
import moment from 'moment';
import Header from '../Header/Header';
import '../App/App.css';
import './Write.css';

const Write = props => {
  const { sleep, saveDiary, history } = props;
  const { createdAt, wakeUpTime, bedTime, sleepDuration, _id } = sleep;

  const sleepDurationList = sleepDuration.split(':');
  const durationHours = sleepDurationList[1] >= 30 ? `${sleepDurationList[0]}.5` : sleepDurationList[0];

  const initialState = {
    date: moment(createdAt).format('YYYY.MM.DD'),
    hours: `${durationHours}시간`,
    bedTime: moment(bedTime).format('HH:mm'),
    wakeUpTime: moment(wakeUpTime).format('HH:mm'),
    sleep: _id
  };

  const [date, setDate] = useState(initialState.date),
    [duration, setDuration] = useState(`${initialState.bedTime}~${initialState.wakeUpTime}`),
    [hours, setHours] = useState(initialState.hours),
    [score, setScore] = useState('점수 선택하기 ▾'),
    [reason, setReason] = useState(''),
    [color, setColor] = useState(''),
    [memo, setMemo] = useState('');

  const options = [],
    colors = [['#F1F1B3', '노랑'], ['#BDE4D7', '초록'], ['#D8DCEB', '보라'], ['#EFC7D6', '빨강'], ['#CCE2EE', '파랑']];

  for (let i = 1; i < 11; i++) {
    options.push(<option key={i} value={i}>
      {i}
      점
                 </option>);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const contents = {
      date: new Date(date),
      sleepHours: hours,
      behaviorScore: score,
      behaviorScoreReason: reason,
      feelingColor: color,
      memo,
      sleep: sleep._id
    };
    saveDiary(contents);
  };

  return (
    <>
      <Header backButton history={history} />
      <main>
        <section className="sleepInfo">
          <div className="date">{date}</div>
          <h1 className="sleepInfo-title">나의 수면시간</h1>
          <h1 className="hours">{hours}</h1>
          <div className="time">{duration}</div>
        </section>
        <div className="contents">
          <form className="diary" action="" method="post">
            <div>
              <h2 className="score-title">
                오늘 나의 말, 행동을
                <br />
                점수로 매긴다면?
              </h2>
              <select
                name="score"
                className="score-select"
                defaultValue={score}
                onChange={e => setScore(e.target.value)}
              >
                <option value="">점수 선택하기 ▾</option>
                {options}
              </select>
              <span className="subText">그 이유를 자유롭게 적어주세요.</span>
              <textarea
                defaultValue={reason}
                onChange={e => setReason(e.target.value)}
              />
            </div>
            <div>
              <h2>
                오늘 나의 기분을
                <br />
                색깔로 표현하면?
              </h2>
              <div className="color-wrapper">
                {colors.map((item, index) => (
                  <div
                    key={index * 99}
                    style={{ backgroundColor: item[0] }}
                    onClick={() => setColor(item)}
                  >
                    {item[1]}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="subText">더 남기고 싶은 이야기가 있나요?</span>
              <textarea
                defaultValue={memo}
                onChange={e => setMemo(e.target.value)}
              />
            </div>
            <input type="submit" className="submit" onClick={e => handleSubmit(e)} />
          </form>
        </div>
      </main>
    </>
  );
};

export default Write;
