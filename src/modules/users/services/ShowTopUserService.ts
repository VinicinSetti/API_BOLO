import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface iRequest{
    user_id: string;
}

class ShowTopUserService {
    public async execute({user_id}: iRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found.');
        }

        return user;
    }
}

export default ShowTopUserService;