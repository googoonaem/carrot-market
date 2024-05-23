'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-btn';
import { useFormState } from 'react-dom';
import smsLogin from './actions';

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useFormState(
    smsLogin,
    initialState
  );
  return (
    <div className="flex flex-col gap-10 py-8 px-6 min-h-screen">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">
          SMS Login
        </h1>
        <h2 className="text-xl">
          Verify your phonenumber
        </h2>
      </div>
      <form
        action={action}
        className="flex flex-col gap-3"
      >
        {state.token ? (
          <FormInput
            type="number"
            name="token"
            placeholder="Verify Code"
            required
            errors={
              state.error?.formErrors
            }
            min={100000}
            max={999999}
          />
        ) : (
          <FormInput
            type="string"
            name="phone"
            placeholder="Phone Number"
            required
            min={100000}
            max={999999}
            errors={
              state.error?.formErrors
            }
          />
        )}
        <FormButton
          text={
            state.token
              ? 'verify token'
              : 'send verification SMS'
          }
        />
      </form>
    </div>
  );
}
