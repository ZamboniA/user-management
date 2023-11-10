import { Router } from "express";
import SessionsController from "../controller/SessionController";


const sessionRouter = Router();


const sessionController = new SessionsController();

sessionRouter.post(
    '/',
    sessionController.create
)


export default sessionRouter;   