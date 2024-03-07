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


