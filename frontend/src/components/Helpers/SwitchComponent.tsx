import type React from 'react';

interface IProps {
  trueCase: string;
  componentMap: Record<string, JSX.Element | null | undefined>;
}

const SwitchComponent: React.FC<IProps> = ({ componentMap, trueCase }: IProps) =>
  componentMap[trueCase] || componentMap.default || null;

export default SwitchComponent;
