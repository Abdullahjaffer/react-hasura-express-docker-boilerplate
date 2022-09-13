import type { IReactProps } from '@/services/Interfaces/IReactProps';
import { PageContainer } from '@ant-design/pro-components';

export const PageContainerLayout = (props: IReactProps) => {
  return <PageContainer title={props.title}>{props.children}</PageContainer>;
};
export default PageContainerLayout;
