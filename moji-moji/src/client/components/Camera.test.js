import '@babel/polyfill';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Camera from './Camera';

configure({ adapter: new Adapter() });

describe('<Camera />', () => {
  describe('about renders', () => {
    let wrapper;
    const props = {
      isGamePaused: false,
      doSnapShotNow: false,
      onLoadedMetadata: jest.fn()
    };

    beforeEach(() => {
      wrapper = shallow(<Camera {...props} />);
      wrapper.setCameraFacing = jest.fn();
    });

    it('component rendered', () => {
      expect(wrapper.find('.Camera').length).toBe(1);
    });

    it('renders an `.Camera__video`', () => {
      expect(wrapper.find('.Camera__video').length).toBe(1);
    });

    it('renders an `Camera__capture-flash` if camera paused', () => {
      const instance = wrapper.instance();
      instance.unPauseCamera = jest.fn();

      wrapper.setState({ isCameraPaused: true });
      expect(wrapper.find('.Camera__capture-flash').length).toBe(1);
    });
  });

  describe('about state', () => {
    Camera.prototype.setCameraFacing = jest.fn();
    const wrapper = shallow(<Camera />);

    it('initial state set', () => {
      expect(wrapper.state().isCameraFront).toBe(false);
      expect(wrapper.state().isCameraPaused).toBe(false);
    });
  });

  describe('about props', () => {
    const onLoadedMetadataMock = jest.fn();
    const wrapper = mount(
      <Camera
        isGamePaused={false}
        doSnapShotNow={false}
        onLoadedMetadata={onLoadedMetadataMock}
      />
    );

    it('allows to set props', () => {
      expect(wrapper.props().isGamePaused).toBe(false);
      expect(wrapper.props().doSnapShotNow).toBe(false);
      expect(wrapper.props().onLoadedMetadata).toBe(onLoadedMetadataMock);
    });
  });

  describe('about prototype method', () => {
    let wrapper;
    let spy;
    const props = {
      isGamePaused: false,
      doSnapShotNow: false,
      onLoadedMetadata: jest.fn()
    };

    beforeEach(() => {
      wrapper = shallow(<Camera {...props} />);
    });

    afterEach(() => {
      spy.mockClear();
    });

    it('ComponentDidMout called once', () => {
      const instance = wrapper.instance();
      spy = jest.spyOn(instance, 'setupCamera');

      instance.componentDidMount();
      expect(instance.setupCamera).toHaveBeenCalledTimes(1);
    });

    it('ComponentDidUpdate called after props changed', () => {
      const instance = wrapper.instance();
      instance.pauseCamera = jest.fn();
      instance.unPauseCamera = jest.fn();
      spy = jest.spyOn(instance, 'pauseCamera');
      spy = jest.spyOn(instance, 'unPauseCamera');

      wrapper.setProps({ isGamePaused: true });
      expect(instance.pauseCamera).toHaveBeenCalled();

      wrapper.setState({ isCameraPaused: true });
      wrapper.setProps({ isGamePaused: false });
      expect(instance.unPauseCamera).toHaveBeenCalled();
    });

    it('Call snapshot function when doSnapShotNow-prop is true', () => {
      const instance = wrapper.instance();
      instance.snapshot = jest.fn();
      spy = jest.spyOn(instance, 'snapshot');

      wrapper.setProps({ doSnapShotNow: true });
      expect(instance.snapshot).toHaveBeenCalled();
    });
  });
});
