import type { IReactProps } from '@/services/Interfaces/IReactProps';
import React from 'react';

const Layout: React.FC<IReactProps> = (props: IReactProps) => {
  return <div>{props.children}</div>;
};

export default Layout;
