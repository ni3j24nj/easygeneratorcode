// src/users/users.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
 
@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
 
    @Post('signup')
    async signUp(@Body() body:{email: string, name: string, password: string} ) {
        console.log("in function signUp: " + body.email);
        const newUser: User = { email: body.email, name: body.name, password: body.password };
        return this.usersService.create(newUser);
    }
 
    @Post('signin')
    async signIn(@Body() user: { email: string; password: string }) {
        const validatedUser = await this.usersService.validateUser(user.email, user.password);
        if (!validatedUser) {
            throw new Error('Invalid credentials');
        }
        return this.usersService.signin(user.email, user.password);
    }
}

