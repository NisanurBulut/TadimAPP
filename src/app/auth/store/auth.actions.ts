import { Action } from '@ngrx/store';
import { AuthModel } from 'src/app/shared/auth.model';

export const LOGIN_START = '[Auth] Login Star';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = '[Auth] Logout';
export const SIGNUP_START = '[Auth] SignUp Start';
export const SIGNUP_SUCCESS = '[Auth] SignUp Success';
export const SIGNUP_FAIL = '[Auth] SignUp Fail';

export class SignUpStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: AuthModel) { }
}

export class LoginSuccess implements Action {

    readonly type = LOGIN_SUCCESS;
    constructor(
        public payload: {
            email: string,
            userId: string,
            token: string,
            expirationDate: Date
        }) {
    }
}
export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: AuthModel) { }
}
export class LoginFailed implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export type AuthActions = LoginSuccess |
    LoginStart |
    LoginFailed |
    SignUpStart |
    Logout;
