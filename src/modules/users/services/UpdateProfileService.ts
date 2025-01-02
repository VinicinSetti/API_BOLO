import { getCustomRepository } from "typeorm";
import { compare, hash } from "bcrypt";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

interface iRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
  qtd_bolin: number;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    qtd_bolin,
  }: iRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("There is already one user with this email.");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }

      user.password = await hash(password, 8);
    }

    if (user.qtd_bolin < user.qtd_bolin + qtd_bolin) {
      user.qtd_total_bolin += qtd_bolin;
    }

    user.name = name;
    user.email = email;
    user.qtd_bolin += qtd_bolin;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
