import { createReducer, on } from '@ngrx/store';
import { handleLoginAction, handleRoleAction } from './page.actions';

export interface FormPageData {
    isLogin?: any;
    isTest?: any;
}

export const initialState = {
    isLogin: false,
    isRole: [],
};

export const LoginReducer = createReducer(
    initialState.isLogin,
    on(handleLoginAction, (state) => {
        // console.log(">>>Check state:", state)
        return !state;
    })
);

export const RoleReducer = createReducer(
    initialState.isRole,
    on(handleRoleAction, (state) => state)
);