import { createReducer, on } from '@ngrx/store';
import { handleLoginAction, handleRoleAction } from './page.actions';

export interface FormPageData {
    isLogin?: any;
    isEdit?: any;
}

export const initialState = {
    isLogin: false,
    isEdit: false,
};

export const LoginReducer = createReducer(
    initialState.isLogin,
    on(handleLoginAction, (state) => {
        // console.log(">>>Check state:", state)
        return !state;
    })
);

export const RoleReducer = createReducer(
    initialState.isEdit,
    on(handleRoleAction, (state) => {
        // console.log(">>>Check state:", state)
        return !state;
    })
);