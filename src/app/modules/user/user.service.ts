import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

//create a new user method
const createUserIntoDB = async (userData: TUser) => {
  // const result = await User.create(user);
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await user.save();
  return result;
};

//Get user method
const getAllUserFromDB = async () => {
  const result = await User.find().select({
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
//Get single user method
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    userId: 1,
    username: 1,
    'fullName.firstName': 1,
    'fullName.lastName': 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    'address.street': 1,
    'address.city': 1,
    'address.country': 1,
  });
  return result;
};

const updateSingleUserFromDB = async (userId: number, userData: TUser) => {
  //hashed password after getting the updated password
  if (userData && userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
};
