import { JwtAuthGuard } from "src/auth/passport/jwt-auth.guard";
import { RolesGuard } from "src/auth/passport/roles.guard";
import { ProblemsModule } from "src/models/problems/problems.module";
import { AdminProblemController } from "./problem.controller";
import { Module } from "@nestjs/common";


@Module({
    imports: [ProblemsModule],
    controllers: [AdminProblemController],
    providers: [RolesGuard, JwtAuthGuard],
})
export class AdminProblemModule { }