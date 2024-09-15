// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot(), // Ensure you have imported ConfigModule
        MongooseModule.forRoot(process.env.MONGODB_URI), // Update with your MongoDB URI
        UsersModule,
    ],
})
export class AppModule {}