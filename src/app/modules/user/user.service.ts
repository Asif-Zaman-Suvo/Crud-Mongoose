import config from '../../config';
import { TUpdateUser, TUser, TUserOrders } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

//create a new user method
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await User.create(userData);
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
  if (!result) {
    throw new Error('User not found');
  }
  const singleUserData = result.toObject();
  return singleUserData;
};

//update single user method
const updateSingleUserFromDB = async (
  userId: number,
  userData: TUpdateUser,
) => {
  //hashed password after getting the updated password
  if (userData && userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

//delete a user from the database

const deleteSingleUserFromDB = async (userId: number) => {
  const result = await User.find().deleteOne({ userId });
  if (result.deletedCount === 0) {
    throw new Error('User not found');
  }
  return result;
};

//update a order from the database
const updateSingleUserOrderFromDB = async (
  userId: number,
  orderData: TUserOrders[],
) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: { $each: orderData } } },
    { new: true, runValidators: true },
  );
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

const getAllOrderfromSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select({
    orders: 1,
  });
  if (!result) {
    throw new Error('User not found');
  }
  if (!result.orders || result.orders.length === 0) {
    throw new Error('Order not found');
  }
  return result.orders;
};

const getTotalPriceOfSpecificUserOrderFromDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: {
        _id: null,
        totalCalculatedPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalCalculatedPrice: 1,
      },
    },
  ]);

  if (result.length === 0 || result[0].totalCalculatedPrice === undefined) {
    throw new Error(
      'This user have no order . please orders something before visit this page.',
    );
  }
  return result[0].totalCalculatedPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserOrderFromDB,
  getAllOrderfromSingleUserFromDB,
  getTotalPriceOfSpecificUserOrderFromDB,
};
