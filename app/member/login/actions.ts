'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

import bcrypt from 'bcrypt';

import { updateSession } from '@/lib/session';
import db from '@/lib/db';

const validateUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });

  return !!user;
};

const formScheme: any = z.object({
  email: z
    .string()
    .trim()
    .email()
    .refine(validateUniqueEmail, 'No Exist Email.'),
  password: z.string().trim().min(5).max(10)
});

export const login = async (prevState: any, formData: FormData) => {
  const data: any = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = await formScheme.spa(data);

  switch (!result.success) {
    case true:
      return {
        errors: result?.error?.flatten().fieldErrors
      };

    default:
      const user = await db.user.findUnique({
        where: {
          email: result.data.email
        },
        select: {
          id: true,
          password: true
        }
      });

      const matched: boolean = await bcrypt.compare(
        result.data.password,
        user.password || ''
      );

      if (matched) {
        await updateSession(user.id);

        redirect('/member/profile');
      } else {
        return {
          errors: { password: ['Password is incorrect'] }
        };
      }
  }
};
