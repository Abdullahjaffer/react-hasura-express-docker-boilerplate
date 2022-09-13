interface IConditionalProps {
  condition: boolean;
  children: JSX.Element;
  fallback?: JSX.Element;
}

const Conditional = ({ condition, children, fallback }: IConditionalProps) =>
  condition ? children : fallback || null;

export default Conditional;
