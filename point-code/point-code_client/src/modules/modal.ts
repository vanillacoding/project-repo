import { createAction, ActionType, createReducer } from 'typesafe-actions';

const TOGGLE = 'modal/TOGGLE';

export const toggle = createAction(TOGGLE)();

const actions = { toggle };
type ModalAction = ActionType<typeof actions>;

type ModalState = boolean;

export const initialState: ModalState = false;

const modal = createReducer<ModalState, ModalAction>(initialState, {
  [TOGGLE]: state => !state
});

export default modal;
