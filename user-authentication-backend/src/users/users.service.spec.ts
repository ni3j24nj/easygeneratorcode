import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('UsersService', () => {
    let service: UsersService;
    let userModel: Model<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userModel = module.get<Model<User>>(getModelToken(User.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should hash the password and save the user', async () => {
            const user = { email: 'test@example.com', password: 'password' };
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const createdUser = { ...user, password: hashedPassword, save: jest.fn().mockResolvedValue(user) };

            const result = await service.create(user);
            expect(result).toEqual(user);
            expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
            expect(createdUser.save).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user if found', async () => {
            const user = { email: 'test@example.com', password: 'password' };
            jest.spyOn(userModel, 'findOne').mockResolvedValue(user as any);

            const result = await service.findOne(user.email);
            expect(result).toEqual(user);
        });

        it('should return undefined if user not found', async () => {
            jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

            const result = await service.findOne('nonexistent@example.com');
            expect(result).toBeUndefined();
        });
    });

    describe('validateUser', () => {
        it('should return the user if validation is successful', async () => {
            const user = { email: 'test@example.com', password: await bcrypt.hash('password', 10) };
            jest.spyOn(service, 'findOne').mockResolvedValue(user as any);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const result = await service.validateUser(user.email, 'password');
            expect(result).toEqual(user);
        });

        it('should return null if validation fails', async () => {
            const user = { email: 'test@example.com', password: await bcrypt.hash('password', 10) };
            jest.spyOn(service, 'findOne').mockResolvedValue(user as any);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

            const result = await service.validateUser(user.email, 'wrongpassword');
            expect(result).toBeNull();
        });
    });

    describe('signin', () => {
        it('should return true if credentials are valid', async () => {
            const user = { email: 'test@example.com', password: await bcrypt.hash('password', 10) };
            jest.spyOn(userModel, 'findOne').mockResolvedValue(user as any);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

            const result = await service.signin(user.email, 'password');
            expect(result).toBe(true);
        });

        it('should throw an error if credentials are invalid', async () => {
            jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

            await expect(service.signin('test@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
    });
});
