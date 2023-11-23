import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  //send the response

  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    // res.status(404).json({
    //   success: false,
    //   message: 'User not found!',
    //   error: {
    //     code: 404,
    //     desciption: 'User not found',
    //   },
    // });
    console.log(error);
  }
};

export const UserControllers = {
  createUser,
};
