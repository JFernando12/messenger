import React, { FC } from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      className="
        inline-flex
        w-full
        justify-center
        px-4
        py-2
        bg-white
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        text-gray-500
        rounded-md
        shadow-sm
        focus:outline-none
      "
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
