import { Card } from 'antd';
import GridWrapper from '../Grid/cardWrapperGrid';

const LoadingCards = () => (
  <GridWrapper data={[0, 1, 2, 3, 5]} Renderer={() => <Card loading={true} />} />
);

export default LoadingCards;
