import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { hash } from "bcrypt"


interface IRequest {
    name: string;
    email: string;
    password: string;
    qtd_bolin: number;
}

class CreateUserService {
    public async execute({name, email, password, qtd_bolin}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists){
            throw new AppError('There is already one user with this email!')
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            qtd_bolin,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;