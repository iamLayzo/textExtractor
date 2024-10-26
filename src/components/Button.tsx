import React from 'react';
import { Loader2, ArrowRight, RefreshCw } from 'lucide-react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  iconPosition?: 'left' | 'right' | 'none';
  iconType?: 'arrow' | 'refresh'; // New prop to handle the icon type
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  iconPosition = 'none',
  iconType = 'arrow', // Default icon type
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variants = {
    primary: 'bg-orange-400 text-white hover:bg-orange-500 focus:ring-orange-200',
    secondary: 'bg-blue-200 text-black hover:bg-blue-300 focus:ring-blue-100',
    outline: 'border border-orange-600 text-orange-600 hover:bg-orange-100 focus:ring-orange-200',
    ghost: 'text-orange-600 hover:bg-orange-100 focus:ring-orange-200',
    link: 'text-blue-600 underline hover:text-blue-800 focus:ring-blue-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  return (
    <StyledWrapper>
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin mr-2 inline-block" size={16} />
            Loading...
          </>
        ) : (
          <>
            {iconPosition === 'left' && iconType === 'arrow' && <ArrowRight className="mr-2 inline-block" size={16} />}
            {iconPosition === 'left' && iconType === 'refresh' && <RefreshCw className="mr-2 inline-block" size={16} />}
            {children}
            {iconPosition === 'right' && iconType === 'arrow' && <ArrowRight className="ml-2 inline-block" size={16} />}
            {iconPosition === 'right' && iconType === 'refresh' && <RefreshCw className="ml-2 inline-block" size={16} />}
          </>
        )}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    color: white;
    background-color: #222;
    font-weight: 500;
    border-radius: 0.5rem;
    font-size: 1rem;
    line-height: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    cursor: pointer;
    text-align: center;
    margin-right: 0.5rem;
    display: inline-flex;
    align-items: center;
    border: none;
  }

  .button:hover {
    background-color: #333;
  }

  .button svg {
    display: inline;
    width: 1.3rem;
    height: 1.3rem;
    margin-right: 0.75rem;
    color: white;
  }

  .button:focus svg {
    animation: spin_357 0.5s linear;
  }

  @keyframes spin_357 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Button;
