import { publicRequest } from "../requestMethods";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user) => {
  dispatch(logoutStart());
  localStorage.removeItem("persist:root");
  dispatch(logoutSuccess());
  try {
    const res = await publicRequest.get("/auth/logout", user);
    dispatch(logoutSuccess(res));
  } catch (err) {
    dispatch(logoutFailure());
  }
};
