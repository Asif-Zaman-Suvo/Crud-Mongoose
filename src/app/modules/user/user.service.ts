import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find().select(
    'username fullName.firstName fullName.lastName age email address.street address.city address.country',
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
