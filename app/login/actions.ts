'use server';

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, 'An account with this email does not exists.'),
  password: z.string(),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(
  //   PASSWORD_REGEX,
  //   PASSWORD_REGEX_ERROR
  // ),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.safeParseAsync(data);
  const user = await db.user.findUnique({
    where: {
      email: result.data?.email,
    },
    select: {
      id: true,
      password: true,
    },
  });
  if (!result.success) {
    return result.error.flatten();
  } else {
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? 'xxx'
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/profile');
    } else {
      return {
        fieldErrors: {
          password: ['wrong password.'],
          email: [],
        },
      };
    }
  }
};
