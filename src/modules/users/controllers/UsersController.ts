import { instanceToInstance } from "class-transformer";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import {Request, Response} from 'express'
import DeleteUserService from "../services/DeleteUserService";


export default class UserController {
    public async index(request: Request, response: Response): Promise<Response>{
        const listUser = new ListUserService();

        console.log(request.user.id);

        const users = await listUser.execute();

        return response.json(instanceToInstance(users));
    }


    public async create(request: Request, response: Response): Promise<Response>{
        const {name, email, password, qtd_bolin, qtd_total_bolin} = request.body;

        const creatUser = new CreateUserService();

        const user = await creatUser.execute({
            name, email, password, qtd_bolin, qtd_total_bolin
        });

        return response.json(instanceToInstance(user));
    }

      public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteUser = new DeleteUserService();
        await deleteUser.execute({ id });
        return response.json([]);
      }

}
