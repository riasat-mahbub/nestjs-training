import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { AuthDto } from "./dto";
import * as argon from 'argon2'

@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService){}

    async login(dto: AuthDto){
        const user = await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        });

        if(!user){
            throw new ForbiddenException('Credentials Incorrect')
        }

        const passMatch = await argon.verify(
            user.hash,
            dto.pass
        )

        if(!passMatch){
            throw new ForbiddenException('Credentials Incorrect')
        }
        
        delete user.hash
        return user
    }




    async register(dto: AuthDto){

        const hash = await argon.hash(dto.pass);
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
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
        }catch(error){
            if(error instanceof PrismaClientKnownRequestError){
                // P2002 is prisma duplicate field error
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'Credentials already taken'
                    )
                }
            }
        }

    }


}