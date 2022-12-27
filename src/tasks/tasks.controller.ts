import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { TasksDto } from "./dto";
import { TasksService } from "./tasks.service";

@Controller('tasks')
export class TasksController{
    constructor(private tasksService: TasksService){}

    @Post("create")
    login(@Body() dto: TasksDto){
       return this.tasksService.create(dto)
    }

    @Get("read")
    read(@Param('id') id: number){
        return this.tasksService.read()
    }

    @Post("update")
    update(@Body('id') id: number, @Body() dto: TasksDto){
        return this.tasksService.update(id, dto)
    }

    @Post("delete")
    delete(@Body('id') id: number){
        return this.tasksService.delete(id)
    }


}