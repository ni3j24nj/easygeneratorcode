// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
 
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
 
    async create(user: Partial<User>): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("in function create: " + user.email);
        const createdUser = new this.userModel({ ...user, password: hashedPassword });
        console.log("in function create: " + createdUser.email);
        return createdUser.save();
    }
 
    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email });
    }
 
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findOne(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
 
    async signin(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate token logic
            return true;
        }
        throw new Error('Invalid credentials');
    }
}