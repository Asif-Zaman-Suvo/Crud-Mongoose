import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);
router.get('/users', UserControllers.getAllUser);
router.get('/users/:userId', UserControllers.getSingleUser);
router.put('/users/:userId', UserControllers.updateSingleUser);
router.delete('/users/:userId', UserControllers.deleteSingleUser);

//orders data

router.put('/users/:userId/orders', UserControllers.updateSingleUserOrder);
router.get('/users/:userId/orders', UserControllers.getAllOrderFromSingleUser);
router.get(
  '/users/:userId/orders/total-price',
  UserControllers.getTotalPriceOfSpecificUserOrder,
);

export const UserRoutes = router;
