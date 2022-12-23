import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){}

    login(){
        return {msg: "Logged in"};
    }

    async register(dto: AuthDto){

        const hash = await argon.hash(dto.pass);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash
            },
            select:{
                email: true,
                firstName:true,
                lastName: true,
                createdAt: true
            }

        })

        return user;
    }
}