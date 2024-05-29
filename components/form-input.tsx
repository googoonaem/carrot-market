import { InputHTMLAttributes } from 'react';

interface FormInputProps {
  errors?: string[];
  name: string;
}

export default function FormInput({
  errors = [],
  name,
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  // console.log(rest);
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none placeholder:text-neutral-400 ring-2 focus:ring-4 transition border-none ring-neutral-200 focus:ring-orange-500"
        {...rest}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
