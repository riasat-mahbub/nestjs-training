import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TasksDto } from "./dto";

@Injectable({})
export class TasksService{
    constructor(private prisma: PrismaService){}

    async create(dto: TasksDto){
        const task = await this.prisma.tasks.create({
            data: {
                text: dto.text,
                reminder: dto.reminder
            }
        })

        return task
    }

    async read(){
        const allTasks = await this.prisma.tasks.findMany()
        return allTasks;
    }

    async readSingle(id: number){
        const singleTask = await this.prisma.tasks.findUnique({
            where:{
                id: id,
            }
        })

        return singleTask
    }

    async update(id: number, dto: TasksDto){
        const task = this.prisma.tasks.update({
            where:{
                id: id
            },
            data:{
                text: dto.text,
                reminder: dto.reminder
            }
        })

        return task;
    }

    async delete(id: number){
        const task = this.prisma.tasks.delete({
            where:{
                id: id
            }
        })

        return task;
    }


}