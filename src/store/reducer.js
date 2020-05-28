import types from "./types";

const INITIAL_STATE = {
    init: {
        appInit: false
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.CHANGE_INIT: {
            return{
                ...state,
                init: {
                    ...state.init,
                    appInit: action.payload
                }
            }
        }
        default:
            return state;
    }
};