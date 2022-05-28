import React, { ButtonHTMLAttributes, FC } from 'react';

type OwnProps = {
  myCustomProp?: 'some' | 'other';
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<OwnProps>;

const Button: Props = ({ children, ...otherProps }) => {
  return <button {...otherProps}>{children}</button>;
};
export default Button;
