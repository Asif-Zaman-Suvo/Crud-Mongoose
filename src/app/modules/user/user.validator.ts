import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string().max(20).min(1),
  lastName: z.string().max(20).min(1),
});

const userAddressSchema = z.object({
  street: z.string().max(20).min(1),
  city: z.string().max(20).min(1),
  country: z.string().max(20).min(1),
});

const userOrderSchema = z.object({
  productName: z.string().max(30).min(3),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const userValidationWithZodSchema = z.object({
  userId: z.number(),
  username: z.string().max(20).min(4),
  password: z.string().max(20).min(4),
  fullName: userFullNameSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).refine((hobbies) => hobbies.length >= 1, {
    message: 'At least one hobby is required',
  }),
  address: userAddressSchema,
  orders: z.array(userOrderSchema).optional(),
});

const updateUserValidationWithZodSchema = z.object({
  username: z.string().max(20).min(4).optional(),
  password: z.string().max(20).min(4).optional(),
  fullName: userFullNameSchema.optional(),
  age: z.number().positive().optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z
    .array(z.string())
    .refine((hobbies) => hobbies.length >= 1, {
      message: 'At least one hobby is required',
    })
    .optional(),
  address: userAddressSchema.optional(),
  orders: z.array(userOrderSchema).optional(),
});

export const userValidationSchema = {
  userValidationWithZodSchema,
  updateUserValidationWithZodSchema,
};
