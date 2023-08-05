import { AppDispatch, AppRootStateType } from 'app/store';
import { handleServerNetworkError } from 'common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {appActions} from "app/app-reducer";
import { ResponseType} from 'common/types';

/**
 * Утилитная функция для запросов на сервер
 * @param thunkAPI - объект с параметрами для работы с запросом
 * @param logic - сам запрос на сервер
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};