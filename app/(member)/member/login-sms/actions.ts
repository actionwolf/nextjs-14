'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import validator from 'validator';

export interface IActionState {
  isToken: boolean;
  errors?: string[];
}

const phoneScheme: any = z
  .string()
  .trim()
  .refine((phone: string) => validator.isMobilePhone(phone, 'ko-KR'), 'xxxxx');

/**
 * coerce: string -> number 변환
 */
const tokenScheme: any = z.coerce.number().min(100000).max(999999);

export const loginSMS = async (prevState: IActionState, formData: FormData) => {
  const { isToken }: IActionState = prevState;

  /** @fixed */
  const data = formData.get(!isToken ? 'phone' : 'token');

  const result: any = (!isToken ? phoneScheme : tokenScheme).safeParse(data);

  switch (!result.success) {
    case true:
      return {
        isToken,
        errors: result.error.flatten().formErrors
      };

    default:
      switch (!isToken) {
        case true:
          return {
            isToken: true
          };

        default:
          redirect('/');
      }
  }

  /** @origin
  const phone = formData.get('phone');
  const token = formData.get('token');

  if (!isToken) {
    const result: any = phoneScheme.safeParse(phone);

    if (!result.success) {
      return {
        isToken: false,
        errors: result?.error.flatten().formErrors
      };
    } else {
      return {
        isToken: true
      };
    }
  } else {
    const result: any = tokenScheme.safeParse(token);

    if (!result.success) {
      return {
        isToken: false,
        errors: result?.error.flatten().formErrors
      };
    } else {
      redirect('/');
    }
  }
  */
};
