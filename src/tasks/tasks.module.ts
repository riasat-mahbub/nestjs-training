import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
    imports: [TasksModule, PrismaModule],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}