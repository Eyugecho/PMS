// reducers.js
import * as actionTypes from './actions/actions';

const initialState = {
  user: null,
  roles: [],
  permissions: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        roles: action.payload.user.roles,
        permissions: action.payload.user.permissions
      };

    default:
      return state;
  }
};

export default userReducer;
