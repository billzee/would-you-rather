import { SET_AUTHED_USER } from "../actions/authedUser";

export default function(state = null, { type, payload }) {
  switch (type) {
    case SET_AUTHED_USER:
      return payload;
    default:
      return state;
  }
}
