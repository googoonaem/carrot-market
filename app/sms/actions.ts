'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    phone =>
      validator.isMobilePhone(
        phone,
        'ko-KR'
      ),
    'wrong phone format!! 😠'
  );

const tokenSchema = z.coerce
  .number()
  .min(100000, 'it is too small')
  .max(999999, 'it is too big');

interface ActionState {
  token: boolean;
}

export default async function smsLogin(
  prevState: ActionState,
  formData: FormData
) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    const result =
      phoneSchema.safeParse(phone);
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result =
      tokenSchema.safeParse(token);
    console.log('@@@', result, '@@@');
    if (!result.success) {
      return {
        token: true,
        //return errors
        error: result.error.flatten(),
      };
    } else {
      //login success!! redirect userhome
      redirect('/');
    }
  }
}
