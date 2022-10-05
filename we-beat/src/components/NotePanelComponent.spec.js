import React from 'react';
import { shallow } from 'enzyme';
import NotePanelComponent from './NotePanelComponent';

function setup() {
  const props = {
    onSelectBeatLine: jest.fn(),
    onBeatListShow: jest.fn(),
    beat: [
      { bass: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
      { ch: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
      { kick: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
      { oh: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
      { snare: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
    ],
    soundList: {
      bass: "/static/media/bass.7c207847.wav",
      ch: "/static/media/ch.8512cd50.wav",
      kick: "/static/media/kick.bfa138c3.wav",
      oh: "/static/media/oh.ebf1bbf2.wav",
      snare: "/static/media/snare.d7222426.wav"
    }
  };

  const component = shallow(
    <NotePanelComponent {...props} />
  );

  return {
    component,
    props
  }
}

describe('note panel component', () => {
  it('should display node panel', () => {
    const { component, props } = setup();
    expect(component.find('.panelWrap')).toHaveLength(props.beat.length);
  });

  it('should loop beat line, should click then play the sound, should select beat line, should show beat list', () => {
    const { component, props } = setup();
    const soundListKeys = Object.keys(props.soundList);
    component.find('.panelWrap').forEach((node, index) => {
      var Audio = jest.fn();
      Audio.prototype.play = jest.fn();
      global.Audio = Audio;
      node.find('.panerSelectButton').simulate('click');
      expect(Audio).toHaveBeenCalledWith(props.soundList[soundListKeys[index]]);
      expect(Audio.prototype.play).toHaveBeenCalled();
      expect(props.onSelectBeatLine).toBeCalledWith(soundListKeys[index]);
      expect(props.onBeatListShow).toBeCalledWith(true);
    });
  });

  it('should loop beat line, should detect mouseDown event', () => {
    const { component } = setup();
    component.find('.panelWrap').forEach((node, index) => {
      node.simulate('mouseDown');
      expect(component.state(['onMouse'])).toEqual(true);
    });
  });

  it('should loop beat line, should detect mouseUp event', () => {
    const { component } = setup();
    component.find('.panelWrap').forEach((node, index) => {
      node.simulate('mouseUp');
      expect(component.state(['onMouse'])).toEqual(false);
    });
  });

  it('should detect all mouse event, when onMouse state is true then tagname isn`t UL or LI', () => {
    const { component } = setup();
    const mockTarget = {
      relatedTarget: {
        tagName: 'DIV'
      }
    };
    // Set the situation to onMouse: true, because test the change onMouse: false
    component.setState({ onMouse: true });

    component.simulate('mouseOut', mockTarget);
    expect(component.state(['onMouse'])).toEqual(false);
  });
});
