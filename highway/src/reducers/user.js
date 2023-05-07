import { produce } from "immer";
import {
  CHECK_USER_ID_FAILURE,
  CHECK_USER_ID_REQUEST,
  CHECK_USER_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../constants/actionTypes";

export const initalState = {
  checkIdLoading: false, // 유저 아이디 중복확인 시도중
  checkIdDone: false,
  checkIdError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  isLogIn: false,
  me:null,
  idValid: false,
};

const reducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHECK_USER_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      // 요기가 saga에 의해 실행된다.
      case CHECK_USER_ID_SUCCESS:
        draft.idValid = action.data;
        draft.checkIdLoading = false;
        draft.checkIdDone = true;
        break;
      case CHECK_USER_ID_FAILURE:
        draft.checkIdLoading = false;
        draft.checkIdError = action.error;
        break;
      // 로그인
      case LOGIN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOGIN_SUCCESS:
        draft.isLogIn = true;
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      // 회원가입
      case SIGNUP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGNUP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGNUP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      // 로그아웃
      case LOGOUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOGOUT_SUCCESS:
        draft.isLogIn = false;
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = action.data;
        break;
      case LOGOUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      default:
        return state;
    }
  });

export default reducer;
