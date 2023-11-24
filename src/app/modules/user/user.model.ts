/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrders,
  UserMethods,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required'],
    trim: true,
  },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: [true, 'street name is required'],
  },
  city: {
    type: String,
    required: [true, 'city name is required'],
  },
  country: {
    type: String,
    required: [true, 'country name is required'],
  },
});

const userOrdersSchema = new Schema<TUserOrders>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'UserId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'full name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [userOrdersSchema],
    required: true,
  },
});
//using pre hook for password hashing when created user
userSchema.pre('save', async function (next) {
  //hashing password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//using post hook for password empty from the field
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});
//remove password field
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
