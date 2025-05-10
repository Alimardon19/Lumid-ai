export interface IAction {
    data?: any;
    id?: string | number;
    params?: any;
    user_id?: number | string;
}

/** Define the shape of the action*/
export interface IPayload {
    type: string;
    payload?: IAction
}

export interface IActionUpdateState {
    type: string;
    payload: {
        key: string;
        state: any; // Consider specifying a more accurate type
    };
}

export interface IAuthState {
    userMe: any;
    loading: boolean;
}