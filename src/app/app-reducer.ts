
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = string | null

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as RequestErrorType,
  isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case "APP/SET-ERROR":
      return {...state, error: action.error}
    case "APP/SET-INITIALIZATION":
      return {...state, isInitialized: action.value}
    default:
      return state
  }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: RequestErrorType) => ({type: 'APP/SET-ERROR', error} as const)

export const setInitialization = (value: boolean) => ({type: 'APP/SET-INITIALIZATION', value} as const)

export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type SetInitializationType = ReturnType<typeof setInitialization>

type ActionsType = SetStatusType | SetErrorType | SetInitializationType
