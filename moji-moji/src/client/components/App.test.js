import '@babel/polyfill';
import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import * as tfc from '@tensorflow/tfjs-core';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Intro from './Intro';
import StatusBar from './StatusBar';
import Camera from './Camera';
import Countdown from './Countdown';
import Loader from './Loader';
import PopUpMenu from './PopUpMenu';
import Finish from './Finish';
import Watch from './Watch';

import * as constants from '../utils/constants';
import * as game from '../utils/game';

configure({ adapter: new Adapter() });
jest.mock('@tensorflow/tfjs-core', () => {});

describe('App', () => {
  describe('about renders', () => {
    let wrapper;
    const props = {
      emojiMobileNet: jest.fn()
    };

    beforeEach(() => {
      wrapper = shallow(<App {...props} />);
    });

    it('component rendered', () => {
      expect(wrapper.find('.App').length).toBe(1);
    });

    describe('currentPage is intro', () => {
      it('intro component rendered', () => {
        expect(wrapper.find(Intro).length).toBe(1);
      });
    });

    describe('currentPage is game', () => {
      it('Camera component rendered', () => {
        wrapper.setState({ currentPage: 'game' });
        expect(wrapper.find(Camera).length).toBe(1);
      });

      it('StatusBar component rendered when currentEmoji exist', () => {
        wrapper.setState({
          currentPage: 'game',
          currentEmoji: { test: 'test' }
        });
        expect(wrapper.find(StatusBar).length).toBe(1);
      });

      it('Countdown component rendered when isCountdown true', () => {
        wrapper.setState({
          currentPage: 'game',
          isCountdown: true
        });
        expect(wrapper.find(Countdown).length).toBe(1);
      });

      it('PopUpMenu component rendered when didUserFound true', () => {
        wrapper.setState({
          currentPage: 'game',
          didUserFound: true
        });
        expect(wrapper.find(PopUpMenu).length).toBe(1);
      });
    });

    describe('currentPage is finish', () => {
      it('Finish component rendered', () => {
        wrapper.setState({
          currentPage: 'finish',
          didUserFound: true
        });
        expect(wrapper.find(Finish).length).toBe(1);
      });
    });

    describe('currentPage is watch', () => {
      it('Watch component rendered', () => {
        wrapper.setState({
          currentPage: 'watch',
          didUserFound: true
        });
        expect(wrapper.find(Watch).length).toBe(1);
      });
    });

    describe('isLoading is ture', () => {
      it('Loader component rendered', () => {
        wrapper.setState({
          isLoading: true
        });
        expect(wrapper.find(Loader).length).toBe(1);
      });
    });
  });

  describe('about state', () => {
    const wrapper = shallow(<App />);

    it('initial state set', () => {
      expect(wrapper.state().countdown).toBe(3);
      expect(wrapper.state().currentEmoji).toEqual({});
      expect(wrapper.state().currentPage).toBe('intro');
      expect(wrapper.state().didUserFound).toBe(false);
      expect(wrapper.state().doSnapShotNow).toBe(false);
      expect(wrapper.state().emojisFound).toEqual([]);
      expect(wrapper.state().endGamePhotos).toEqual([]);
      expect(wrapper.state().isCountdown).toBe(false);
      expect(wrapper.state().isGamePaused).toBe(false);
      expect(wrapper.state().isLoading).toBe(false);
      expect(wrapper.state().score).toBe(0);
      expect(wrapper.state().timer).toBe(constants.GAME_START_TIME);
    });
  });

  describe('about props', () => {
    const props = {
      emojiMobileNet: {}
    };
    const wrapper = mount(<App {...props} />);

    it('allows to set props', () => {
      expect(wrapper.props().emojiMobileNet).toBe(props.emojiMobileNet);
    });
  });

  describe('about prototype method', () => {
    let wrapper;
    let spy;
    const props = {
      emojiMobileNet: {
        load: jest.fn()
      }
    };

    beforeEach(() => {
      wrapper = mount(<App {...props} />);
    });

    afterEach(() => {
      spy.mockClear();
    });

    it('ComponentDidMout called once', () => {
      const instance = wrapper.instance();
      instance.createSignalingChannel = jest.fn();
      spy = jest.spyOn(instance, 'createSignalingChannel');

      instance.componentDidMount();
      expect(instance.createSignalingChannel).toHaveBeenCalledTimes(1);
    });
  });
});
