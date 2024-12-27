import {Router} from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import SessionsControler from '../controllers/SessionController';


const sessionRouter = Router();
const sessionController = new SessionsControler();

sessionRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    sessionController.create
);


export default sessionRouter