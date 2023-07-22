export interface UserSchema {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: null | string;
}

export interface PromptSchema {
    _id: string;
    creator: UserSchema;
    prompt: string;
    hashtags: string;
    timeStamp: string;
    __v: number;
}

export interface PromptDBSchema {
    _id: string;
    creator: string;
    prompt: string;
    hashtags: string;
    timeStamp: string;
    __v: number;
}

export interface FormSchema {
    prompt: string;
    hashtags: string;
}