import {Dispatch} from 'redux'
import {
  setAppStatus,
  SetErrorType,
  setInitialization,
  SetInitializationType,
  SetStatusType
} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatus('loading'))
  authAPI.login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true))
          dispatch(setAppStatus('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    }
  })
      .finally(() => {
        dispatch(setInitialization())
      })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatus('loading'))
  authAPI.logout()
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(false))
          dispatch(setAppStatus('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
}


// types
export type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusType | SetErrorType
