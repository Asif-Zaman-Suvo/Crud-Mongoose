import { TUser } from './user.interface';
import { UserModel } from './user.model';

//create a new user method
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

//Get user method
const getAllUserFromDB = async () => {
  const result = await UserModel.find().select({
    username: 1,
    'fullName.firstName': 1,
    'fullName.lastName': 1,
    age: 1,
    email: 1,
    'address.street': 1,
    'address.city': 1,
    'address.country': 1,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
