import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'


interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string
}

class CreateSessionsService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user){
            throw new AppError('Incorrect email/password combination', 401)
        }

        const passwordConfimed = await compare(password, user.password);

        if (!passwordConfimed){
            throw new AppError('Incorrect email/password combination', 401)
        }

        const token = sign({}, authConfig.jwt.secret, {subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token
        };
    }
}

export default CreateSessionsService;