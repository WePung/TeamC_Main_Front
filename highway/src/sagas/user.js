import axios from "axios";
import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  CHECK_USER_ID_REQUEST,
  CHECK_USER_ID_SUCCESS,
  CHECK_USER_ID_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
} from "../constants/actionTypes";

axios.defaults.withCredentials = true;

const checkUserIdAPI = (data) => {
  // console.log(data);
  return axios.get(`/user/idCheck?id=${data}`);
};

const logInAPI = (data) => {
  return axios.post('http://localhost:4000/api/userInfo/login', data);
}

function* logIn(action){
  try{
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function* checkUserId(action) {
  try {
    // console.log(action.data);
    const result = yield call(checkUserIdAPI, action.data);
    yield put({
      type: CHECK_USER_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_USER_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchCheckUserId() {
  yield takeLatest(CHECK_USER_ID_REQUEST, checkUserId);
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, logIn);
}

export default function* userSaga() {
  yield all([
    fork(watchCheckUserId),
    fork(watchLogIn)
  ]);
}
