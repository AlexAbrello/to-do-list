import {Dispatch} from 'redux'
import {appActions} from "app/app-reducer";
import axios, {AxiosError} from "axios";

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером при наличии проблем с сетью
 * @param e - непосредственно сама ошибка
 * @param dispatch - функция для отправки сообщений в store Redux
 */


export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}))
    }
    // dispatch(appActions.setAppStatus({status: 'failed'}))
}
