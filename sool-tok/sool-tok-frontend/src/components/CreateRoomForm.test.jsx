import React from 'react';
import { mount } from 'enzyme';
import CreateRoomForm from './CreateRoomForm';

describe('renders correctly', () => {
  const ON_CHANGE = jest.fn();
  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <CreateRoomForm
        onSubmit={ON_CHANGE}
      />,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
    wrapper.unmount();
  });

  it('input value should be email', () => {
    const FAKE_TITLE = 'title';
    const emailInput = wrapper.find('input').first();

    const event = {
      preventDefault() {},
      target: { value: FAKE_TITLE },
    };

    emailInput.value = FAKE_TITLE;
    emailInput.simulate('change', event);

    expect(emailInput).toHaveLength(1);
    expect(emailInput.prop('type')).toEqual('text');
    expect(emailInput.prop('name')).toEqual('title');
    expect(emailInput.value).toBe('title');
    expect(ON_CHANGE.mock.calls.length).toEqual(0);
  });

  it('submit event when click submit input', () => {
    const submitInput = wrapper.find('[type="submit"]');

    expect(submitInput).toHaveLength(1);
    expect(submitInput.prop('type')).toEqual('submit');
  });
});
