import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN START';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export class Login implements Action {
    readonly type = LOGIN;
    constructor(
        public payload: {
            email: string,
            userId: string,
            token: string,
            expirationDate: Date
        }) { }
}
export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string }) { }
}
export class Logout implements Action {
    readonly type = LOGOUT;
}
export type AuthActions = Login | Logout | LoginStart;
