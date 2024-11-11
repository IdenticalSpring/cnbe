import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super({
            clientID: configService.get<string>('GITHUB_CLIENT_ID'),
            clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
            scope: ['user:email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { username, emails, displayName } = profile;

        if (!emails || emails.length === 0) {
            throw new BadRequestException('No email found in GitHub profile');
        }

        const email = emails[0].value;

        // Gọi AuthService để xác thực hoặc tạo người dùng
        const user = await this.authService.validateOAuthLoginGithub({
            username,
            email,
            name: displayName || username,
        });

        return user;
    }
}
