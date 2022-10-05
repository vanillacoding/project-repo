import React from 'react';
import { mount } from 'enzyme';
import AddFriendForm from './AddFriendForm';

describe('renders correctly', () => {
  const SET_MODAL_OPEN = jest.fn();
  const MOCK_USER = {
    _id: '123123',
    email: 'sooltok@gmail.com',
    friendList: [],
    friendRequestList: [],
    isOnline: true,
    name: 'name',
    photoUrl: 'photoUrl',
    updatedAt: '1140',
    createdAt: '1140',
  };
  const FRIEND_EMAIL = 'dev@gmail.com';

  let wrapper;

  beforeEach(() => {
    jest.useFakeTimers();
    wrapper = mount(
      <AddFriendForm
        user={MOCK_USER}
        setModalOpen={SET_MODAL_OPEN}
      />,
    );
  });

  afterEach(() => {
    jest.useRealTimers();
    wrapper.unmount();
  });

  it('input value should be email', () => {
    const ON_CHANGE = jest.fn();
    const emailInput = wrapper.find('input').first();

    const event = {
      preventDefault() {},
      target: { value: FRIEND_EMAIL },
    };

    emailInput.value = FRIEND_EMAIL;
    emailInput.simulate('change', event);

    expect(emailInput).toHaveLength(1);
    expect(emailInput.prop('type')).toEqual('email');
    expect(emailInput.prop('name')).toEqual('email');
    expect(emailInput.value).toBe('dev@gmail.com');
    expect(ON_CHANGE.mock.calls.length).toEqual(0);
  });

  it('submit event when click submit input', () => {
    const submitInput = wrapper.find('[type="submit"]');

    expect(submitInput).toHaveLength(1);
    expect(submitInput.prop('type')).toEqual('submit');
  });
});
