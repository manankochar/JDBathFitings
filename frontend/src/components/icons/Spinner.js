import React from 'react';
import { Icon } from '@chakra-ui/react';

const SpinnerIcon = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient
          id={`spinner-gradient-${Math.random().toString(36).substr(2, 9)}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke={`url(#spinner-gradient-${Math.random().toString(36).substr(2, 9)})`}
        strokeWidth="4"
      />
    </Icon>
  );
};

export default SpinnerIcon;