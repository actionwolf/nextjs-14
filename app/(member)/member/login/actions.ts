'use server';

import { z } from 'zod';

const formScheme: any = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(5).max(10)
});

export const login = async (prevState: any, formData: FormData) => {
  const data: any = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = formScheme.safeParse(data);

  switch (!result.success) {
    case true:
      return {
        errors: result?.error?.flatten().fieldErrors
      };

    default:
      return {
        ...result.data
      };
  }
};
