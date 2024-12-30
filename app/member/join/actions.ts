'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { updateSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import db from '@/lib/db';

/**
http://zod.dev

.regex // 정규식 판단
.trim()
.toLowerCase()
.coerce() // string -> number
.transform((username)=> 'wolf') // 변경
*/

const validateUniqueUserName = async (user_name: string) => {
  const user = await db.user.findUnique({
    where: {
      user_name
    },
    select: {
      id: true
    }
  });

  return !user;
};

const validateUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });

  return !user;
};

const formScheme: any = z
  .object({
    user_name: z
      .string()
      .trim()
      .min(3)
      .max(10)
      .refine(validateUniqueUserName, 'Aleady Exist User Name'),
    email: z
      .string()
      .trim()
      .email()
      .refine(validateUniqueEmail, 'Aleady Exist Email'),
    password: z.string().trim().min(5),
    password_confirm: z.string().trim().min(5)
  })
  /**
  .refine(({ password, password_confirm }) => password === password_confirm, 'Both should be the same.') // formErrors 에 포함됌 
  */
  .refine(({ password, password_confirm }) => password === password_confirm, {
    message: 'Both should be the same.',
    path: ['password_confirm']
  });

export const join = async (prevState: any, formData: FormData) => {
  const data = {
    user_name: formData.get('user_name'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm')
  };

  /**
   const result = formScheme.parse(data); // occured 500
   const result = formScheme.safeParse(data) 
   const result = await formScheme.safeParseAsync(data); // for db connection
   safeParseAsync -> spa
  */
  const result = await formScheme.spa(data);

  switch (!result.success) {
    case true:
      return {
        ...result.data,
        errors: result.error.flatten()?.fieldErrors
      };

    default:
      const hashedPassword = await bcrypt.hash(result.data.password, 12);

      const user = await db.user.create({
        data: {
          user_name: result.data.user_name,
          email: result.data.email,
          password: hashedPassword
        },
        select: {
          id: true
        }
      });

      await updateSession(user.id);

      redirect('/');
  }
};
