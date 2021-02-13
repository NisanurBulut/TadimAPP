import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
}
const initialState: State = { user: null, authError: null, loading: false };

export function authReducer(
    state = initialState,
    action: fromAuthActions.AuthActions) {
    switch (action.type) {
        case fromAuthActions.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                authError: null,
                loading: false
            };
        case fromAuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case fromAuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        case fromAuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case fromAuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                loading: false
            };
        case fromAuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };
        default:
            return state;
    }
}
