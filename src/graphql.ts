
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface RegisterUserInput {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    birthDate: DateTime;
    password: string;
    repeatedPassword: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface LoginUserOutput {
    accessToken: string;
}

export interface IQuery {
    getAllUsers(): User[] | Promise<User[]>;
    getUserById(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    signUp(data: RegisterUserInput): User | Promise<User>;
    signIn(data: LoginUserInput): Nullable<LoginUserOutput> | Promise<Nullable<LoginUserOutput>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
