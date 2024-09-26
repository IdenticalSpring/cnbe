  import { Module } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';
  import { UsersModule } from '../models/users/users.module';
  import { JwtModule } from '@nestjs/jwt';
  import { ConfigModule, ConfigService } from '@nestjs/config';
  import { LocalStrategy } from './passport/local.strategy';
  import { PassportModule } from '@nestjs/passport';
  import { JwtStrategy } from './passport/jwt.strategy';
  import { GitHubStrategy } from './passport/github.strategy';
  import { GoogleStrategy } from './passport/google.strategy';
import { RolesGuard } from './passport/roles.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';


  @Module({
    imports:[
      UsersModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRED'),
          },
        }),
        inject: [ConfigService],
      }),
      PassportModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, GitHubStrategy, GoogleStrategy, RolesGuard, JwtAuthGuard],
  })
  export class AuthModule {}
