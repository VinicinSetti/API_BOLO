import {Router} from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';


const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', isAuthenticated, profileController.show);

profileRouter.put('/:user_id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string().optional(),
            password_confirmation: Joi.string()
            .valid(Joi.ref('password'))
            .when(
              'password', {
              is: Joi.exist(),
              then: Joi.required()
            }),
            qtd_bolin: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        }
    }),
    profileController.update
);


export default profileRouter
