import axios from "axios";
import { call, put, all, fork, takeLatest } from "redux-saga/effects";
import {
  CHECK_USER_ID_REQUEST,
  CHECK_USER_ID_SUCCESS,
  CHECK_USER_ID_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../constants/actionTypes";

axios.defaults.withCredentials = true;

const checkUserIdAPI = (data) => {
  // console.log(data);
  return axios.get(`/user/idCheck?userId=${data}`);
};

const logInAPI = (data) => {
  return axios.get(`user/login?userId=${data.userId}&userPw=${data.userPw}`, data)
}

const signUpAPI = (data) => {
  return axios.post(`/user/join?userId=${data.userId}&userPw=${data.userPw}&userName=${data.userName}&userEmail=${data.userEmail}&userSex=${data.userSex}&userAge=${data.userAge}`);
}

function* checkUserId(action) {
  try {
    // console.log(action.data);
    const result = yield call(checkUserIdAPI, action.data);
    yield put({
      type: CHECK_USER_ID_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_USER_ID_FAILURE,
      error: err.response.data,
    });
  }
}

function* logIn(action){
  try{
    const result = yield call(logInAPI, action.data);
      yield put({
        type: LOGIN_SUCCESS,
        data: result,
      })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp(action){
  try{
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function* logOut(action){
  try{
    yield put({
      type: LOGOUT_SUCCESS,
      data: null,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
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

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([
    fork(watchCheckUserId),
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
  ]);
}
