import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";
import ListUserService from "../service/ListUserService";


export default class UsersController {

    public async create (req: Request, res: Response): Promise<Response>{
        try {
            const { name, email, password } = req.body;

            const createUser = new CreateUserService();

            const user = await createUser.execute({
                name,
                email,
                password
            });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const listUser = new ListUserService();
            const user = await listUser.execute(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            return res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor" });
        }
    }
}