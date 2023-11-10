import { Router } from "express";
import UsersController from "../controller/UserController";


const usersRouter = Router();


const usersController = new UsersController();

usersRouter.get('/:id',
    usersController.index
)
usersRouter.get('/',
    usersController.index
)
usersRouter.post(
    '/',
    usersController.create
)


export default usersRouter;