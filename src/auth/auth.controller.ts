import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller()

export class AuthController{
    constructor(private authService: AuthService){
    }

    @Post('login')
    login(){
        return " I am logged in"
    }

    @Post('register')
    register(){
        return " I have been registered"
    }
}