import { ActionType } from './action';

function commentReducer(state = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_COMMENTS:
    return action.payload.comments;
  case ActionType.ADD_COMMENT:
    return [action.payload.comment, ...state];
  default:
    return state;
  }
}

export default commentReducer;
