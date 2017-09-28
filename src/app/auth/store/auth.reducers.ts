
export interface State {
  token: string,
  isAuthenticated: boolean
}

const initialState: State = {
  token: null,
  isAuthenticated: false
};

export function authReducer(state = initialState, action) {
  return state;
}
