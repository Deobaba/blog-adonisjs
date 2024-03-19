export interface createUser {
    username: string
    email: string
    password: string
    age: number
}

export interface Users {
    id?: number;
    username: string;
    email: string;
    password: string;
    age: number;
    rememberMeToken?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    username: string;
    email: string;
    id: number;
    age: number;
    created_at: Date;
    updated_at: Date;
    token: string;
}

export interface UserJWT{
    _id: number;
    iat: number;
    exp: number;
}

export interface createPost {
    userid: number,
    title: string,
    content: string,
    isPublished: boolean,
}