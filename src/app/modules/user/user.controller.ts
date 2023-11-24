import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
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
      error: error,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
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
    const result = await UserServices.updateSingleUserFromDB(
      Number(userId),
      userData,
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

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
};
