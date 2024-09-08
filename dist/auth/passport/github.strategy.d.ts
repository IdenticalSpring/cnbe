import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../auth.service';
declare const GitHubStrategy_base: new (...args: any[]) => Strategy;
export declare class GitHubStrategy extends GitHubStrategy_base {
    private authService;
    constructor(authService: AuthService);
    authorizationParams(): Record<string, string>;
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
