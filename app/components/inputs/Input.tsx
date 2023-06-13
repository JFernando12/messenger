'use client';
import clsx from 'clsx';
import React from 'react';
import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

interface InputProps {
  label: string;
  type: string;
  id: string;
  disable?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  disable,
  required,
  register,
  errors,
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        disabled={disable}
        {...register(id, { required })}
        className={clsx(`
          mt-2
          form-input
          block
          w-full
          rounded-md
          border-0
          ring-1
          ring-inset
          ring-gray-300
          focus:ring-2
          focus:ring-inset
          focus:ring-sky-600
          sm:text-sm
          sm:leading-6
        `)}
      />
    </div>
  );
};

export default Input;
