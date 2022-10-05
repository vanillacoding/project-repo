import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import VideoPopUp from '../components/VideoPopup.jsx';
import AlarmRegisterPage from '../pages/AlarmRegisterPage.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Loading from '../pages/Loading.jsx';

if (!window.location.hash || window.location.hash === '#/') {
  window.location.hash = '#/loading';
}

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [content, setContent] = useState('');
  const [campaignUrl, serCampaignUrl] = useState('');

  useEffect(() => {
    ipcRenderer.on('playVideo', (event, campaignId, content, url, campaignUrl) => {
      setVideoUrl(url);
      setCampaignId(campaignId);
      setContent(content);
      serCampaignUrl(campaignUrl);
      window.location.hash = '#/popup';
    });
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/loading">
          <Loading />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/alarmRegister">
          <AlarmRegisterPage />
        </Route>
        <Route path="/popup">
          <VideoPopUp
            videoUrl={videoUrl}
            campaignId={campaignId}
            content={content}
            campaignUrl={campaignUrl}
          />
        </Route>
      </Switch>
    </Router>
  );
}
