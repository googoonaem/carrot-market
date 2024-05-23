'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-btn';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function Login() {
  const [state, trigger] = useFormState(
    login,
    null
  );
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">
          안녕하세요!
        </h1>
        <h2 className="text-xl">
          Login in with email and
          password
        </h2>
      </div>
      <form
        action={trigger}
        className="flex flex-col gap-3"
      >
        <FormInput
          type="email"
          placeholder="Email"
          required
          errors={
            state?.fieldErrors.email
          }
          minLength={
            PASSWORD_MIN_LENGTH
          }
          name="email"
        />
        <FormInput
          type="password"
          placeholder="password"
          required
          errors={
            state?.fieldErrors.password
          }
          name="password"
        />
        <FormButton text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
