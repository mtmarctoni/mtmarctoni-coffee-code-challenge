import React from "react";

type IconProps = {
  className?: string;
  size?: number;
};

export const ErrorIcon = ({ className = "w-6 h-6", size }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M12 9V13" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M12 17.0195V17" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5", size }: IconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    width={size} 
    height={size}
    fill="none" 
    stroke="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M7 7L17 17" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M17 7L7 17" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);