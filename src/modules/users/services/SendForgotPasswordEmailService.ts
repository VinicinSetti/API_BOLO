import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import path from "path";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherealMail from "@config/mail/EtherealMail";


interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async execute({email}: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokenRepository);

        const user = await usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exist!')
        }

        const {token} = await userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '../',
            'views',
            'forgot_password.hbs'
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[API Vendas] Recuperação de senhas.',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                }
            }
        });
    }
}

export default SendForgotPasswordEmailService;
