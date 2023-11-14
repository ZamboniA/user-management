import { Router } from "express";
import usersRouter from "../../../module/users/routes/users.routes";
import sessionRouter from "../../../module/users/routes/sessions.routes";
import passwordRouter from "../../../module/users/routes/password.routes";


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);


export default routes;