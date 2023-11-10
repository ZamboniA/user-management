import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";


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
}