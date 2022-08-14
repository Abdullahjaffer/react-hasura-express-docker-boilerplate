import type React from 'react';

interface IProps {
  children: JSX.Element;
  fallback?: JSX.Element;
  condition: boolean;
}

const Condtion: React.FC<IProps> = ({ children, fallback, condition }: IProps) =>
  condition ? children : !!fallback ? fallback : null;

export default Condtion;
