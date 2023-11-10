import { Request, Response } from "express";
import CreateSessionService from "../service/CreateSessionService";



export default class SessionsController {

    public async create (req: Request, res: Response): Promise<Response>{
        try {
            const {email, password } = req.body;

            const createSession = new CreateSessionService();

            const user = await createSession.execute({
                email,
                password
            });

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}