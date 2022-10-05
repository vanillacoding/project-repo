import React, { Component, Fragment } from 'react';
import * as tfc from '@tensorflow/tfjs-core';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import './App.scss';

import Camera from './Camera';
import Countdown from './Countdown';
import Finish from './Finish';
import Intro from './Intro';
import Loader from './Loader';
import PopUpMenu from './PopUpMenu';
import StatusBar from './StatusBar';
import Watch from './Watch';

import * as constants from '../utils/constants';
import * as game from '../utils/game';
import { isIOS, isMobile } from '../utils/device';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 3,
      currentEmoji: {},
      currentPage: 'intro',
      didUserFound: false,
      doSnapShotNow: false,
      emojisFound: [],
      endGamePhotos: [],
      isCountdown: false,
      isGamePaused: false,
      isLoading: false,
      score: 0,
      timer: constants.GAME_START_TIME
    };

    this.currentLvlIndex = 0;
    this.endpoint = '';
    this.gameDifficulty = '1121222345';
    this.isRunning = false;
    this.topKemojiName = '';
    this.userId = (Math.random() * 100).toString().replace('.', '');

    this.handleBroadcastClick = this.handleBroadcastClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleSnapShot = this.handleSnapShot.bind(this);
    this.handleTryAgainClick = this.handleTryAgainClick.bind(this);
    this.handleWatchClick = this.handleWatchClick.bind(this);
    this.onInitGame = this.onInitGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  async componentDidMount() {
    this.createSignalingChannel();
    game.audioSources[game.AUDIO.INTRO].onloadeddata = () => {
      setTimeout(() => this.setupAudioSources(), 3000);
    };
  }

  checkEmojiMatch(emojiNameTop1, emojiNameTop2) {
    const { currentEmoji } = this.state;

    if (this.topKemojiName !== emojiNameTop1) {
      this.topKemojiName = emojiNameTop1;
    }

    if (
      currentEmoji.name === emojiNameTop1 ||
      currentEmoji.name === emojiNameTop2
    ) {
      this.emojiFound();
    }
  }

  countdown(count) {
    return new Promise(resolve => {
      if (count === 0) {
        setTimeout(() => {
          if (!this.isRunning) {
            this.startGame();
          }

          this.setState({
            isCountdown: false
          });
        }, 2000);
      } else {
        setTimeout(() => {
          this.pauseAudio(game.AUDIO.LOADING);
          this.setState({
            isLoading: false,
            isCountdown: true,
            countdown: count
          });
          resolve(count);
        }, 1000);
      }
    });
  }

  createPeerConnection(connectionType) {
    const myPeerConnection = new RTCPeerConnection();

    myPeerConnection.onicecandidate = event => {
      console.log('handleIceCandidate event: ', event);
      if (event.candidate) {
        this.socket.emit('candidate', {
          userId: this.userId,
          connectionType,
          candidate: event.candidate
        });
      } else {
        console.log('End of candidates.');
      }
    };

    myPeerConnection.ontrack = event => {
      console.log('Remote stream added.');
      if (event.streams && event.streams[0]) {
        window.watcherStream = event.streams[0];
      }

      this.setState({
        currentPage: 'watch'
      });
    };

    return myPeerConnection;
  }

  createSignalingChannel() {
    this.socket = io(this.endpoint, { secure: true });

    this.socket.on('candidate', message => {
      console.log('candidate', message);
      if (message.connectionType === 'player') {
        this.watcherPeerConnection.addIceCandidate(message.candidate);
      } else {
        this.playerPeerConnection.addIceCandidate(message.candidate);
      }
    });

    this.socket.on('create', async message => {
      try {
        if (message.result === 'exist') {
          return alert('already exist');
        }

        await this.setupBroadcastCamera();
        alert(`broadcast '${message.broadcastId}' ready!`);
      } catch (err) {
        console.log('error occured in broadcast setup', err);
      }
    });

    this.socket.on('join', async message => {
      try {
        if (message.result === 'non exist') {
          return alert('non exist broadcast ID');
        }

        const watcherPeerConnection = await this.createPeerConnection(
          'watcher'
        );
        this.watcherPeerConnection = watcherPeerConnection;

        const offer = await watcherPeerConnection.createOffer({
          offerToReceiveVideo: true
        });

        await watcherPeerConnection.setLocalDescription(offer);

        this.socket.emit('offer', {
          userId: this.userId,
          broadcastId: message.broadcastId,
          targetUserId: message.targetUserId,
          desc: watcherPeerConnection.localDescription
        });

        alert('ready to watch!');
      } catch (err) {
        console.log('error occured in peer connection', err);
      }
    });

    this.socket.on('re-join', async message => {
      try {
        const offer = await this.watcherPeerConnection.createOffer({
          offerToReceiveVideo: true
        });

        await this.watcherPeerConnection.setLocalDescription(offer);

        this.socket.emit('re-offer', {
          userId: this.userId,
          broadcastId: message.broadcastId,
          targetUserId: message.targetUserId,
          desc: this.watcherPeerConnection.localDescription
        });
      } catch (err) {
        console.log('error occured in re-join process', err);
      }
    });

    this.socket.on('offer', async message => {
      try {
        const playerStream = window.playerStream;
        const watcherStream = window.watcherStream;
        const playerPeerConnection = this.createPeerConnection('player');
        this.playerPeerConnection = playerPeerConnection;
        const desc = new RTCSessionDescription(message.desc);

        await playerPeerConnection.setRemoteDescription(desc);
        if (message.isBroadcastOrigin) {
          await playerStream.getTracks().forEach(track => {
            playerPeerConnection.addTrack(track, playerStream);
          });
        } else {
          await watcherStream.getTracks().forEach(track => {
            playerPeerConnection.addTrack(track, watcherStream);
          });
        }

        const answer = await playerPeerConnection.createAnswer();
        await playerPeerConnection.setLocalDescription(answer);

        this.socket.emit('answer', {
          userId: this.userId,
          broadcastId: message.broadcastId,
          targetUserId: message.targetUserId,
          desc: playerPeerConnection.localDescription
        });
      } catch (err) {
        console.log('error occured in offer process', err);
      }
    });

    this.socket.on('re-offer', async message => {
      try {
        const desc = new RTCSessionDescription(message.desc);

        await this.playerPeerConnection.setRemoteDescription(desc);
        const answer = await this.playerPeerConnection.createAnswer();
        await this.playerPeerConnection.setLocalDescription(answer);

        this.socket.emit('re-answer', {
          userId: this.userId,
          broadcastId: message.broadcastId,
          targetUserId: message.targetUserId,
          desc: this.playerPeerConnection.localDescription
        });
      } catch (err) {
        console.log('error occured in re-offer process', err);
      }
    });

    this.socket.on('answer', async message => {
      console.log('answer', message);
      this.watcherPeerConnection.setRemoteDescription(
        new RTCSessionDescription(message.desc)
      );
    });
  }

  delayedUpdateTimer(value) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.updateTimer(value);
        resolve(value);
      }, 70);
    });
  }

  emojiFound() {
    const { currentEmoji, emojisFound, score } = this.state;

    this.pauseGame();
    this.playAudio(game.AUDIO.FOUND_IT);
    this.setState({
      score: score + 1,
      emojisFound: [...emojisFound, currentEmoji],
      doSnapShotNow: true
    });

    if (constants.GAME_MAX_ITEMS === score) {
      this.setState({
        currentPage: 'finish'
      });
    } else {
      setTimeout(() => {
        this.showItemFoundView();
      }, 500);
    }
  }

  async setupBroadcastCamera() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true
        });

        // camera selection
        // const stream = await navigator.mediaDevices.getUserMedia({
        //   audio: false,
        //   video: { facingMode: 'environment' }
        // });

        window.playerStream = stream;
      }
    } catch (err) {
      console.log('error occured in getting media process', err);
    }
  }

  showItemFoundView() {
    this.extendTimer();
    this.setState({
      didUserFound: true
    });
  }

  updateTimer(value) {
    this.setState({
      timer: value
    });
  }

  async extendTimer() {
    const { timer } = this.state;
    const maxTimer = timer + 1 + constants.GAME_EXTEND_TIME + 1;

    this.playAudio(game.AUDIO.TIMER_INCREASE, true);

    for (let i = timer + 2; i < maxTimer; i++) {
      try {
        await this.delayedUpdateTimer(i);
      } catch (err) {
        console.log('error occured in delayed update timer process', err);
      }
    }

    this.pauseAudio(game.AUDIO.TIMER_INCREASE);
  }

  handleBroadcastClick() {
    if (isMobile()) {
      return alert('Mobile device is not currently supported');
    }

    const broadcastId = prompt('Make broadcast ID');

    if (!broadcastId) {
      return;
    }

    if (broadcastId.trim().length <= 0) {
      return alert('Please enter broadcast ID');
    }

    this.pauseAudio(game.AUDIO.INTRO);

    this.socket.emit('create', {
      userId: this.userId,
      broadcastId
    });
  }

  handleGameTimerCountdown() {
    const { timer } = this.state;

    if (timer === 0) {
      this.pauseAudio(game.AUDIO.GAME_LOOP);
      this.pauseAudio(game.AUDIO.TIME_RUNNING_LOW);
      window.clearInterval(this.timerInterval);
      this.showFoundView();
    } else {
      this.setState({
        timer: timer - 1
      });

      if (timer <= 6) {
        this.playAudio(game.AUDIO.TIME_RUNNING_LOW);
      }
    }
  }

  handleHomeClick() {
    this.resetGame();
    this.setState({
      currentPage: 'intro',
      isLoading: false
    });
  }

  handlePlayClick() {
    if (isIOS()) {
      return alert('IOS is not currently supported');
    }

    this.pauseAudio(game.AUDIO.INTRO);
    this.playAudio(game.AUDIO.LOADING, true, 0, 3);
    this.setState({
      isLoading: true,
      currentPage: 'game'
    });
  }

  handleNextClick() {
    this.showCountdown();
    this.nextEmoji();
  }

  handleSnapShot(img) {
    const { endGamePhotos } = this.state;

    this.setState({
      doSnapShotNow: false,
      endGamePhotos: [...endGamePhotos, img]
    });
  }

  handleWatchClick() {
    if (isIOS()) {
      return alert('IOS is not currently supported');
    }

    const broadcastId = prompt('Input broadcast ID');

    if (!broadcastId) {
      return;
    }

    if (broadcastId.trim().length <= 0) {
      return alert('Please enter broadcast ID');
    }

    this.pauseAudio(game.AUDIO.INTRO);

    this.socket.emit('join', {
      broadcastId,
      userId: this.userId
    });
  }

  nextEmoji() {
    if (this.currentLvlIndex === this.gameDifficulty.length) {
      this.currentLvlIndex = 0;
    }

    const curLvl = this.gameDifficulty[this.currentLvlIndex];
    let lvlArray = game.emojiLvlLookup[curLvl];
    // for demo
    // let lvlArray = game.emojiLvlLookup['#'];
    let nextEmoji = lvlArray.shift();

    if (nextEmoji === undefined) {
      game.reShuffleLevelEmojis(curLvl);
      lvlArray = game.emojiLvlLookup[curLvl];
      nextEmoji = lvlArray.shift();
    }

    this.currentLvlIndex++;

    this.setState({
      currentEmoji: nextEmoji,
      isLoading: true
    });
  }

  async onInitGame(videoRef) {
    const { emojiMobileNet } = this.props;

    try {
      await emojiMobileNet.load();
      await this.warmUpModel();

      this.nextEmoji();
      this.predict(videoRef);
      this.showCountdown();
    } catch (err) {
      console.log('error occured in init game process', err);
    }
  }

  pauseCamera() {
    this.setState({
      isGamePaused: true
    });
  }

  pauseGame() {
    if (this.isRunning) {
      this.pauseCamera();
    }

    this.isRunning = false;

    this.pauseAudio(game.AUDIO.GAME_LOOP);
    this.pauseAudio(game.AUDIO.TIME_RUNNING_LOW);

    this.setState({
      isGamePaused: true
    });

    window.clearInterval(this.timerInterval);
    window.clearInterval(this.speakInterval);
  }

  handleTryAgainClick() {
    this.resetGame();
    this.playAudio(game.AUDIO.LOADING, true, 0, 3);
    this.setState({
      currentPage: 'game',
      isLoading: true
    });
  }

  pauseAudio(audio) {
    game.audioSources[audio].pause();
    game.audioSources[audio].currentTime = 0;
  }

  playAudio(audio, loop = false, startTime = 0, endTime = undefined) {
    const audioElement = game.audioSources[audio];

    if (loop) {
      audioElement.loop = true;
    }

    if (game.audioSources[audio].paused) {
      audioElement.currentTime = startTime;
      const playPromise = audioElement.play();

      if (endTime !== undefined) {
        const timeUpdate = () => {
          if (audioElement.currentTime >= endTime) {
            audioElement.pause();
            audioElement.removeEventListener('timeupdate', timeUpdate);
          }
        };

        audioElement.addEventListener('timeupdate', timeUpdate);
      }

      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('error occured in playAudio', err);
        });
      }
    }
  }

  async predict(videoRef) {
    const { emojiMobileNet } = this.props;

    if (!videoRef.current) {
      return;
    }

    if (this.isRunning) {
      try {
        const result = tfc.tidy(() => {
          const pixels = tfc.browser.fromPixels(videoRef.current);
          const centerHeight = pixels.shape[0] / 2;
          const beginHeight = centerHeight - constants.VIDEO_PIXELS / 2;
          const centerWidth = pixels.shape[1] / 2;
          const beginWidth = centerWidth - constants.VIDEO_PIXELS / 2;
          const pixelsCropped = pixels.slice(
            [beginHeight, beginWidth, 0],
            [constants.VIDEO_PIXELS, constants.VIDEO_PIXELS, 3]
          );

          return emojiMobileNet.predict(pixelsCropped);
        });

        const topK = await emojiMobileNet.getTopKClasses(result, 10);

        this.checkEmojiMatch(topK[0].label, topK[1].label);
      } catch (err) {
        console.log('error occured in predict process', err);
      }
    }

    window.requestAnimationFrame(() => this.predict(videoRef));
  }

  resetAudioSources() {
    Object.keys(game.audioSources).forEach(audio => {
      this.pauseAudio(audio);
    });
  }

  resetGame() {
    this.resetAudioSources();
    this.nextEmoji();
    this.updateTimer(constants.GAME_START_TIME);

    this.setState({
      score: 0,
      timer: constants.GAME_START_TIME,
      emojisFound: [],
      endGamePhotos: []
    });

    this.currentLvlIndex = 0;
    this.timerAtStartOfRound = constants.GAME_START_TIME;
    this.topKemojiName = '';
  }

  resumeGame() {
    const { isGamePaused } = this.state;

    if (isGamePaused) {
      this.startGame();
    }
  }

  setupAudioSources() {
    Object.keys(game.audioSources).forEach(audio => {
      game.audioSources[audio].muted = true;
      const playPromise = game.audioSources[audio].play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            game.audioSources[audio].pause();
            game.audioSources[audio].muted = false;
            this.playAudio(game.AUDIO.INTRO, true);
          })
          .catch(err => {
            console.log('error occured with play promise', err);
          });
      }
    });
  }

  async showCountdown() {
    const { timer } = this.state;

    if (this.isRunning) {
      this.isRunning = false;
    }

    setTimeout(() => {
      this.playAudio(game.AUDIO.COUNTDOWN);
    }, 1000);

    this.updateTimer(timer, true);
    try {
      await this.countdown(3);
      await this.countdown(2);
      await this.countdown(1);
      await this.countdown(-1); // for show emoji
      await this.countdown(0);
    } catch (err) {
      console.log('error occured in countdown process', err);
    }
  }

  startGame() {
    const { timer, didUserFound } = this.state;

    if (didUserFound) {
      this.setState({
        didUserFound: false
      });
    }

    if (!this.isRunning) {
      this.unPauseCamera();
    }

    this.isRunning = true;

    this.pauseAudio(game.AUDIO.COUNTDOWN);
    this.playAudio(game.AUDIO.GAME_LOOP, true);

    this.timerAtStartOfRound = timer;
    this.timerInterval = window.setInterval(() => {
      this.handleGameTimerCountdown();
    }, constants.GAME_TIMER_DELAY);
  }

  showFoundView() {
    const { emojisFound } = this.state;

    if (!emojisFound.length) {
      this.playAudio(game.AUDIO.FAIL);
    } else if (emojisFound.length <= 5) {
      this.playAudio(game.AUDIO.END);
    } else {
      this.playAudio(game.AUDIO.WIN);
    }

    this.pauseGame();
    this.setState(
      {
        currentPage: 'finish'
      },
      this.updateTimer.bind(this, constants.GAME_START_TIME)
    );
  }

  unPauseCamera() {
    this.setState({
      isGamePaused: false
    });
  }

  warmUpModel() {
    const { emojiMobileNet } = this.props;

    emojiMobileNet.predict(
      tfc.zeros([constants.VIDEO_PIXELS, constants.VIDEO_PIXELS, 3])
    );
  }

  render() {
    const {
      countdown,
      currentEmoji,
      currentPage,
      didUserFound,
      doSnapShotNow,
      endGamePhotos,
      isCountdown,
      isGamePaused,
      isLoading,
      score,
      timer
    } = this.state;

    return (
      <div className="App">
        {isLoading && <Loader />}
        {currentPage === 'intro' && (
          <Intro
            onBroadcastClick={this.handleBroadcastClick}
            onPlayClick={this.handlePlayClick}
            onWatchClick={this.handleWatchClick}
          />
        )}
        {currentPage === 'game' && (
          <Fragment>
            {Object.keys(currentEmoji).length ? (
              <StatusBar
                currentEmoji={currentEmoji}
                onHomeClick={this.handleHomeClick}
                score={score}
                timer={timer}
              />
            ) : null}
            <Camera
              isGamePaused={isGamePaused}
              doSnapShotNow={doSnapShotNow}
              onLoadedMetadata={this.onInitGame}
              onSnapShot={this.handleSnapShot}
            />
            {isCountdown && (
              <Countdown countdown={countdown} currentEmoji={currentEmoji} />
            )}
            {didUserFound && (
              <PopUpMenu
                emoji="👍"
                text="You did it!"
                buttonText="NEXT EMOJI"
                onButtonClick={this.handleNextClick}
              />
            )}
          </Fragment>
        )}
        {currentPage === 'finish' && (
          <Finish
            endGamePhotos={endGamePhotos}
            onHomeClick={this.handleHomeClick}
            onTryAgainClick={this.handleTryAgainClick}
          />
        )}
        {currentPage === 'watch' && <Watch />}
      </div>
    );
  }
}

App.propTypes = {
  emojiMobileNet: PropTypes.instanceOf(Object).isRequired
};

export default App;
