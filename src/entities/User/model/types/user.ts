export interface JWTTokenData {
    token: string
}

export interface UserData {
    isNew: boolean;
}

export interface UserSchema {
    isLoading: boolean;
    isInit: boolean;
    token?: JWTTokenData;
    data?: UserData;
}

export interface UserAuthData {
    success: boolean;
    data: JWTTokenData
}
