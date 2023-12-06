/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.validator';

const createUser = async (req: Request, res: Response) => {
  try {
    const zodParseData = userValidationSchema.userValidationWithZodSchema.parse(
      req.body,
    );
    const result = await UserServices.createUserIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    const updateZodParseData =
      userValidationSchema.updateUserValidationWithZodSchema.parse(userData);
    const result = await UserServices.updateSingleUserFromDB(
      Number(userId),
      updateZodParseData,
    );
    res.status(200).json({
      success: true,
      message: 'Users updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//orders section
const updateSingleUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user: userData } = req.body;
    await UserServices.updateSingleUserOrderFromDB(
      Number(userId),
      userData.orders,
    );
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrderFromSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getAllOrderfromSingleUserFromDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'Order not found!',
      },
    });
  }
};

const getTotalPriceOfSpecificUserOrder = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getTotalPriceOfSpecificUserOrderFromDB(
      Number(userId),
    );
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not found!',
      error: {
        code: 404,
        description: 'Total price not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateSingleUserOrder,
  getAllOrderFromSingleUser,
  getTotalPriceOfSpecificUserOrder,
};
