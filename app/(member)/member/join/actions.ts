'use server';

import { z } from 'zod';

/**
http://zod.dev

.regex // 정규식 판단
.trim()
.toLowerCase()
.coerce() // string -> number
.transform((username)=> 'wolf') // 변경
*/

const formScheme: any = z
  .object({
    user_name: z.string().trim().min(3).max(10),
    email: z.string().trim().email(),
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
  */
  const result = formScheme.safeParse(data);

  switch (!result.success) {
    case true:
      return {
        ...result.data,
        errors: result.error.flatten()?.fieldErrors
      };

    default:
      return {
        ...result.data
      };
  }
};
