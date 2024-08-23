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
        roles: action.payload.roles,
        permissions: action.payload.permissions
      };

    default:
      return state;
  }
};

export default userReducer;
