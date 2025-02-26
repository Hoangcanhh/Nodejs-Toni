import { Controller, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Post, Body } from "@nestjs/common";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async login(@Body() loginDto:  {username: string; password: string}) {
        return this.authService.login(loginDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("Login")
    getProfile(@Body() loginDto: {username: string; password: string}) {
        return this.authService.login(loginDto);
    }

}