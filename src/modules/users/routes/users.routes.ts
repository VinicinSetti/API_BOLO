import {Router} from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
// import uploadConfig from '@config/upload'
import UserController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
// import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const userController = new UserController();
// const usersAvatarController = new UserAvatarController();

// const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, userController.index);

usersRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            qtd_bolin: Joi.number().required(),
            qtd_total_bolin: Joi.number().required(),
        }
    }),
    userController.create
);

// usersRouter.patch(
//     '/avatar',
//     isAuthenticated,
//     upload.single('avatar'),
//     usersAvatarController.update
// );


export default usersRouter