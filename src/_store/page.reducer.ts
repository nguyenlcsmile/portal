import { createReducer, on } from '@ngrx/store';
import { handleLoginAction, handleTestAction } from './page.actions';

export interface FormPageData {
    isLogin?: any;
    isTest?: any;
}

export const initialState = {
    isLogin: false,
    isTest: false
};

export const LoginReducer = createReducer(
    initialState.isLogin,
    on(handleLoginAction, (state) => {
        // console.log(">>>Check state:", state)
        return !state;
    })
);

export const TestReducer = createReducer(
    initialState.isTest,
    on(handleTestAction, (state) => state)
);