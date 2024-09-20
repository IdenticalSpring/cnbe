import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CLIENT_URL,
            scope: ['user:email'],
        });
    }
    authorizationParams(): Record<string, string> {
        return {
            prompt: 'login',
        };
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
        const user = await this.authService.validateOAuthLoginGithub(profile);
        return user || null;
    }
}
