import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

//call the controller function
router.post('/users', UserControllers.createUser);

export const UserRoutes = router;
