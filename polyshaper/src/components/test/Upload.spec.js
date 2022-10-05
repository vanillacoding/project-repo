import 'jsdom-global/register';
import React from 'react';
import Upload from '../Upload';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom';

function setup() {
  const uploadImageHandler = jest.fn();
  const component = shallow(<Upload />);

  return {
    component,
    uploadImageHandler,
    state: {
      active: false,
      target: false,
      hover: false
    }
  };
}

describe('Upload component', () => {
  it('has states correctly', () => {
    const { component } = setup();
    expect(component.state().active).toEqual(false);
    expect(component.state().target).toEqual(false);
    expect(component.state().hover).toEqual(false);
  });

  describe('window should listen event on componentDidMount', () => {
    beforeEach(() => {
      const { window } = new JSDOM('<!doctype html><html><body></body></html>');
      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();
      global.window = window;
    });

    it('listen event dragover', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('dragover', component.instance().dropTarget);
    });

    it('listen event dragleave', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('dragleave', component.instance().dropLeave);
    });

    it('listen event drop', () => {
      const { component } = setup();
      expect(global.window.addEventListener).toHaveBeenCalledWith('drop', component.instance().handleDrop);
    });
  });

  describe('window should remove event listeners on componentWillUnmount', () => {
    beforeEach(() => {
      const { window } = new JSDOM('<!doctype html><html><body></body></html>');
      window.removeEventListener = jest.fn();
      global.window = window;
    });

    it('remove event dragover', () => {
      let { component } = setup();
      const dropTarget = component.instance().dropTarget;
      component.unmount();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('dragover', dropTarget);
    });

    it('remove event dragleave', () => {
      const { component } = setup();
      const dropLeave = component.instance().dropLeave;
      component.unmount();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('dragleave', dropLeave);
    });

    it('remove event drop', () => {
      const { component } = setup();
      const handleDrop = component.instance().handleDrop;
      component.unmount();
      expect(global.window.removeEventListener).toHaveBeenCalledWith('drop', handleDrop);
    });
  });
});
