import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService{
    login(){
        return {msg: "Logged in"};
    }

    register(){
        return {msg: "Registered"};
    }
}