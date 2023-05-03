import { produce } from "immer";
import {
  CHECK_USER_ID_FAILURE,
  CHECK_USER_ID_REQUEST,
  CHECK_USER_ID_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../constants/actionTypes";

export const initalState = {
  checkIdLoading: false, // 유저 아이디 중복확인 시도중
  checkIdDone: false,
  checkIdError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  idValid: false,
  isLogIn: false,
  me:null,
};

const reducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 아이디 증복체크
      case CHECK_USER_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      case CHECK_USER_ID_SUCCESS:
        draft.idValid = true;
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
        break;
      case LOGIN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
        
      default:
        return state;
    }
  });

export default reducer;
