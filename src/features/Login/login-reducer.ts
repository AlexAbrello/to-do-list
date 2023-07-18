import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {appActions} from "app/app-reducer";
import {AppThunk} from "app/store";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({status: 'loading'}))
  authAPI.login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
}
export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    }
    dispatch(appActions.setAppInitialized({isInitialized: true}))
  })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
  authAPI.logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(false))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
}
