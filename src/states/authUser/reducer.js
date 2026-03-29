import { ActionType } from './action';

function authUserReducer(authUser = null, actions = {}) {
  switch (actions.type) {
  case ActionType.SET_AUTH_USER:
    return actions.payload.authUser;
  case ActionType.UNSET_AUTH_USER:
    return null;
  default:
    return authUser;
  }
}
export default authUserReducer;
