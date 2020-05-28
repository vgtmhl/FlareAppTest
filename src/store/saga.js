import types from "./types";
import actions from "./actions";
import { takeEvery, call, put, all } from "redux-saga/effects";

function* starter() {
    console.log("saga started");
    yield put(actions.changeInit("started"));
}

function* watchInit() {
    yield takeEvery(types.INIT_APP, function* () {
        yield call(starter);
    })
}

function* watchChangedInit() {
    yield takeEvery(types.CHANGE_INIT, function* (){
        yield console.log("ciao");
    })
}

export default function* (){
    yield all([
        watchInit(),
        watchChangedInit()
    ]);
};

 