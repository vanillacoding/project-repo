import {
  reducer,
  enterChat,
  leaveChat
} from '../../features/chatSlice';

describe('chat slice test', () => {
  it('enter chat', () => {
    const key = "isEntered";
    const prevState = { isEntered: false };
    const result = reducer(prevState, enterChat());

    expect(result[key]).toEqual(true);
  });

  it('leave chat', () => {
    const key = "isEntered";
    const prevState = { isEntered: true };
    const result = reducer(prevState, leaveChat());

    expect(result[key]).toEqual(false);
  });
});
