import { SET_USERS } from "../actions/users";

export default function(state = {}, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return { ...state, ...payload };
    default:
      return state;
  }
}
