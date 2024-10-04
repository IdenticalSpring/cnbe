import { Module } from "@nestjs/common";
import { UsersModule } from "src/models/users/users.module";
import { AdminUsersController } from "./user.controller";
import { RolesGuard } from "src/auth/passport/roles.guard";
import { JwtAuthGuard } from "src/auth/passport/jwt-auth.guard";

@Module({
    imports: [UsersModule],
    controllers: [AdminUsersController],
    providers: [RolesGuard, JwtAuthGuard], 
   
})
export class AdminUserModule { }