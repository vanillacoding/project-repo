import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import AlarmNavbar from '../components/AlarmNavbar.jsx';
import AlarmRegister from '../components/AlarmRegister.jsx';
import styled from 'styled-components';
import { color } from '../css/color';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  width: 30vw;
  min-width: 120px;
  background-color: ${color.MAIN};
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  background-color: ${color.BACK};
`;

export default function AlarmRegisterPage() {
  const [alarms, setAlarms] = useState([]);
  const token = useSelector((state) => state.loginReducer.accessToken);

  useEffect(() => {
    ipcRenderer.send('requestAlarms');
    ipcRenderer.on('loadAlarms', (event, data) => {
      setAlarms(data);
    });

    ipcRenderer.send('requestPrepareAlarms', token);
  }, []);

  function handleDeleteButtonClick(time) {
    setAlarms(alarms.filter(alarm => alarm.time !== time));
    ipcRenderer.send('deleteAlarm', time);
  }

  function handleToggleClick(time) {
    ipcRenderer.send('toggleAlarm', time);
  }

  function handleRegisterAlarmSubmit(data) {
    const { time, bodyPart, customVideo } = data;

    if (alarms.some(alarm => alarm.time === time)) {
      return;
    }

    const alarm = { time, bodyPart, customVideo };

    setAlarms(alarms.concat(alarm));
    ipcRenderer.send('storeAlarm', token, alarm);
  }

  return (
    <Container>
      <LeftSection>
        <AlarmNavbar
          alarms={alarms}
          onToggleClick={handleToggleClick}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      </LeftSection>
      <RightSection>
        <AlarmRegister onRegisterAlarmSubmit={handleRegisterAlarmSubmit} />
      </RightSection>
    </Container>
  );
}
