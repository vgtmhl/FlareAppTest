import types from "./types";
import { createAction } from 'redux-actions';

const initApp = createAction(types.INIT_APP);
const changeInit = createAction(types.CHANGE_INIT);

export default {
    initApp,
    changeInit
}