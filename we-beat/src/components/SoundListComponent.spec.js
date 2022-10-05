import React from 'react';
import { shallow } from 'enzyme';
import SoundListComponent from './SoundListComponent';
import { initialState } from '../reducers/index';
import { defaultSound } from '../source/defaultSound';

function setup() {
  const props = {
    onChangeBeatLine: jest.fn(),
    addBeatSoundFile: jest.fn(),
    keys: 'keys',
    soundList: {
      'inst1': defaultSound.bass,
      'inst2': defaultSound.kick
    },
    beat: initialState.beat
  };

  const component = shallow(
    <SoundListComponent {...props} />
  );

  return {
    component,
    props
  }
}

describe('sound list component', () => {
  it('should display sound list', () => {
    const { component } = setup();
    expect(component.find('li')).toHaveLength(2);
  });

  it('should click then play the sound', () => {
    const { component, props } = setup();
    component.find('li').forEach((node, index) => {

      var Audio = jest.fn();
      Audio.prototype.play = jest.fn();
      global.Audio = Audio;

      node.find('.audioPlayButton').simulate('click');
      expect(Audio).toHaveBeenCalledWith(props.soundList[`inst${index + 1}`]);
      expect(Audio.prototype.play).toHaveBeenCalled();
    });
  });

  it('should change beat line', () => {
    const { component, props } = setup();
    component.find('li').forEach((node, index) => {
      node.find('.beatLineChangebutton').simulate('click');
      expect(props.onChangeBeatLine).toBeCalledWith(Object.keys(props.soundList)[index]);
    });
  });

  it('should select beat sound file', () => {
    const { component, props } = setup();
    const mockFile = {
      type: 'audio/',
      size: 10000
    };
    const mockEvent = {
      target: {
        files: [mockFile]
      },
    };
    component.find('#beatSelectButton').simulate('change', mockEvent);
    expect(props.addBeatSoundFile).toBeCalledWith(mockFile, props.keys);
  });
});
