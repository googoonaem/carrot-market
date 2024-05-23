'use server';
import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import { z } from 'zod';

const checkUsername = (
  username: string
) => {
  return !username.includes('potato');
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, 'too short name 😜')
      .max(10, 'too long name 😜')
      .toLowerCase()
      .refine(
        checkUsername,
        'i hate potato'
      ),
    email: z.string().email(),
    password: z
      .string()
      .min(10)
      .regex(
        PASSWORD_REGEX,
        PASSWORD_REGEX_ERROR
      ),
    confirm_password: z
      .string()
      .min(10),
  })
  .refine(checkPassword, {
    message: '비밀번호가 같지 않습니다',
    path: ['confirm_password'],
  });

export async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get(
      'confirm_password'
    ),
  };
  const result =
    formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
