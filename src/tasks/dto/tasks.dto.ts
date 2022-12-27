import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class TasksDto{
    @IsString()
    @IsNotEmpty()
    text: string

    @IsBoolean()
    @IsNotEmpty()
    reminder: boolean
}